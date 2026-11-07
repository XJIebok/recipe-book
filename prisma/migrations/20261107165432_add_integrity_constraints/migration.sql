-- Дополнение к первоначальной миграции ЛР6.
-- Выполняется ПОСЛЕ CREATE TABLE, CREATE INDEX и ADD FOREIGN KEY.
-- Предназначено для PostgreSQL 18 и Prisma ORM 6.19.2.

-- 1. Проверки обычных скалярных значений.
ALTER TABLE "Recipe"
    ADD CONSTRAINT "Recipe_baseServings_positive_chk"
        CHECK ("baseServings" > 0),
    ADD CONSTRAINT "Recipe_cookingTime_nonnegative_chk"
        CHECK ("cookingTimeMinutes" >= 0);

ALTER TABLE "RecipeStep"
    ADD CONSTRAINT "RecipeStep_position_positive_chk"
        CHECK ("position" > 0),
    ADD CONSTRAINT "RecipeStep_duration_nonnegative_chk"
        CHECK ("durationMinutes" IS NULL OR "durationMinutes" >= 0);

ALTER TABLE "StepIngredientUsage"
    ADD CONSTRAINT "StepIngredientUsage_fraction_range_chk"
        CHECK ("fraction" IS NULL OR ("fraction" > 0 AND "fraction" <= 1));

-- 2. Согласованность двух числовых полей независимо от вида единицы.
-- Допустимы: NULL + NULL, положительное число + NULL,
-- положительный минимум + строго больший максимум.
ALTER TABLE "IngredientMeasurement"
    ADD CONSTRAINT "IngredientMeasurement_amount_shape_chk"
        CHECK (
            ("amount" IS NULL AND "maxAmount" IS NULL)
            OR
            (
                "amount" IS NOT NULL
                AND "amount" > 0
                AND (
                    "maxAmount" IS NULL
                    OR "maxAmount" > "amount"
                )
            )
        );

-- 3. Одинаковые сочетания не дублируем, даже при NULL в полях количества.
-- Индекс также подходит для поиска вариантов одного ингредиента.
CREATE UNIQUE INDEX "IngredientMeasurement_combination_unique_idx"
    ON "IngredientMeasurement" ("ingredientId", "unitCode", "amount", "maxAmount")
    NULLS NOT DISTINCT;

-- 4. Триггер проверяет, соответствует ли указанной единице форма количества.
-- NUMERIC: положительное количество (точное или диапазон).
-- QUALITATIVE: оба числовых поля должны быть NULL.
CREATE FUNCTION "check_ingredient_measurement_kind"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    actual_kind "UnitKind";
BEGIN
    -- FOR SHARE не даст параллельно изменить kind, пока создаётся запись.
    SELECT "kind"
      INTO actual_kind
      FROM "MeasurementUnit"
     WHERE "code" = NEW."unitCode"
     FOR SHARE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Неизвестная единица измерения: %', NEW."unitCode"
            USING ERRCODE = '23503';
    END IF;

    IF actual_kind = 'QUALITATIVE' THEN
        IF NEW."amount" IS NOT NULL OR NEW."maxAmount" IS NOT NULL THEN
            RAISE EXCEPTION 'Для качественной единицы % числа должны быть NULL', NEW."unitCode"
                USING ERRCODE = '23514';
        END IF;
    ELSIF actual_kind = 'NUMERIC' THEN
        IF NEW."amount" IS NULL THEN
            RAISE EXCEPTION 'Для числовой единицы % необходимо положительное amount', NEW."unitCode"
                USING ERRCODE = '23514';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER "IngredientMeasurement_check_kind_trg"
    BEFORE INSERT OR UPDATE OF "unitCode", "amount", "maxAmount"
    ON "IngredientMeasurement"
    FOR EACH ROW
    EXECUTE FUNCTION "check_ingredient_measurement_kind"();

-- 5. Не разрешаем менять kind справочника, если он уже используется.
CREATE FUNCTION "prevent_used_unit_kind_change"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF OLD."kind" IS DISTINCT FROM NEW."kind"
        AND EXISTS (
            SELECT 1
              FROM "IngredientMeasurement"
             WHERE "unitCode" = OLD."code"
        ) THEN
        RAISE EXCEPTION 'Нельзя менять вид (%) используемой единицы %', OLD."kind", OLD."code"
            USING ERRCODE = '23514';
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER "MeasurementUnit_prevent_kind_change_trg"
    BEFORE UPDATE OF "kind"
    ON "MeasurementUnit"
    FOR EACH ROW
    EXECUTE FUNCTION "prevent_used_unit_kind_change"();

-- 6. Переиспользуемые IngredientMeasurement считаются неизменяемыми.
-- При редактировании рецепта следует найти или создать новую комбинацию,
-- а затем поменять ссылку RecipeIngredient.measurementId.
CREATE FUNCTION "prevent_measurement_rewrite"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF ROW(NEW."id", NEW."ingredientId", NEW."unitCode", NEW."amount", NEW."maxAmount")
       IS DISTINCT FROM
       ROW(OLD."id", OLD."ingredientId", OLD."unitCode", OLD."amount", OLD."maxAmount") THEN
        RAISE EXCEPTION 'IngredientMeasurement неизменяема: создайте новую комбинацию'
            USING ERRCODE = '23514';
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER "IngredientMeasurement_prevent_rewrite_trg"
    BEFORE UPDATE
    ON "IngredientMeasurement"
    FOR EACH ROW
    EXECUTE FUNCTION "prevent_measurement_rewrite"();
