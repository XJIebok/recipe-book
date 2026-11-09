import { randomUUID } from "node:crypto";
import { Prisma, type Cuisine } from "@prisma/client";
import { prisma } from "../prisma";
import {
  parseRecipeImport,
  type RecipeImportIngredient,
  type RecipeImportInput,
} from "./validation";

// Используется только сервером и локальными scripts, НЕ клиентским React-кодом.
// Для будущего публичного API необходима отдельная проверка сессии и прав.
export type SaveRecipeOptions =
  | { mode?: "create"; allowCreateIngredients?: boolean }
  | { mode: "replace-seeded"; seedSlug: string; allowCreateIngredients?: boolean };

function normalizedQuantity(ingredient: RecipeImportIngredient): {
  unitCode: string;
  amount: string | null;
  maxAmount: string | null;
} {
  const quantity = ingredient.quantity;
  if (quantity.type === "qualitative") {
    return { unitCode: quantity.value, amount: null, maxAmount: null };
  }
  if (quantity.type === "range") {
    return {
      unitCode: quantity.unit,
      amount: quantity.min.toFixed(3),
      maxAmount: quantity.max.toFixed(3),
    };
  }
  return {
    unitCode: quantity.unit,
    amount: quantity.amount.toFixed(3),
    maxAmount: null,
  };
}

/**
 * Используем уникальный индекс с NULLS NOT DISTINCT из нашей SQL-миграции.
 * Prisma Schema не умеет описывать его как обычный @@unique.
 *
 * INSERT ... ON CONFLICT DO NOTHING безопасен при параллельном импорте и не
 * обновляет общую/неизменяемую IngredientMeasurement. SQL параметризован.
 */
async function getOrCreateMeasurement(
  tx: Prisma.TransactionClient,
  ingredientId: string,
  unitCode: string,
  amount: string | null,
  maxAmount: string | null,
): Promise<number> {
  const inserted = await tx.$queryRaw<Array<{ id: number }>>`
    INSERT INTO "IngredientMeasurement"
      ("ingredientId", "unitCode", "amount", "maxAmount")
    VALUES (
      ${ingredientId}, ${unitCode},
      ${amount}::numeric, ${maxAmount}::numeric
    )
    ON CONFLICT ("ingredientId", "unitCode", "amount", "maxAmount")
    DO NOTHING
    RETURNING "id"
  `;

  if (inserted.length > 0) return inserted[0].id;

  // После завершённого конфликта в READ COMMITTED запись доступна на новом запросе.
  const found = await tx.ingredientMeasurement.findFirst({
    where: { ingredientId, unitCode, amount, maxAmount },
    select: { id: true },
  });
  if (!found) {
    throw new Error(`Не удалось получить общую запись количества ${ingredientId}/${unitCode}`);
  }
  return found.id;
}

/**
 * Атомарное создание рецепта из проверенного JSON-представления.
 * Режим replace-seeded разрешён ТОЛЬКО для собственных рецептов seed:
 * сохраняет ID Recipe и избранное, но полностью пересоздаёт шаги/состав.
 * Для пользовательского импорта используется mode=create (по умолчанию).
 */
export async function saveRecipe(
  rawInput: unknown,
  options: SaveRecipeOptions = {},
): Promise<{ id: number; slug: string }> {
  const input: RecipeImportInput = parseRecipeImport(rawInput);
  const isSeed = options.mode === "replace-seeded";
  const slug = isSeed ? options.seedSlug : `recipe-${randomUUID()}`;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100) {
    throw new Error(`Некорректный slug: ${slug}`);
  }

  return prisma.$transaction(async (tx) => {
    const requiredUnits = new Set(input.ingredients.map((item) => normalizedQuantity(item).unitCode));
    for (const code of requiredUnits) {
      const existingUnit = await tx.measurementUnit.findUnique({ where: { code } });
      if (!existingUnit) {
        throw new Error(`Единица ${code} отсутствует в MeasurementUnit. Сначала запустите seed справочников.`);
      }
    }

    for (const item of input.ingredients) {
      const found = await tx.ingredient.findUnique({ where: { id: item.ingredientId } });
      if (!found) {
        if (!options.allowCreateIngredients || !item.ingredientName) {
          throw new Error(
            `Ингредиент ${item.ingredientId} не найден. ` +
            "Сопоставьте его со справочником или разрешите создание нового с ingredientName.",
          );
        }
        // Не обновляем уже существующее название данными из внешнего JSON.
        await tx.ingredient.upsert({
          where: { id: item.ingredientId },
          update: {},
          create: { id: item.ingredientId, name: item.ingredientName },
        });
      }
    }

    const recipeData = {
      title: input.title,
      summary: input.summary,
      cuisine: (input.cuisine ?? null) as Cuisine | null,
      baseServings: input.baseServings,
      cookingTimeMinutes: input.cookingTimeMinutes,
      image: input.image ?? null,
      imageAlt: input.imageAlt ?? null,
      videoUrl: input.videoUrl ?? null,
    };

    const recipe = isSeed
      ? await tx.recipe.upsert({
          where: { slug },
          create: { slug, ...recipeData },
          update: recipeData,
        })
      : await tx.recipe.create({ data: { slug, ...recipeData } });

    if (isSeed) {
      // Записи FavoriteRecipe не трогаем, а Recipe.id сохраняется.
      // При удалении шагов связанные StepIngredientUsage удаляются CASCADE.
      await tx.recipeStep.deleteMany({ where: { recipeId: recipe.id } });
      await tx.recipeIngredient.deleteMany({ where: { recipeId: recipe.id } });
    }

    const ingredientIds = new Map<string, number>();
    for (const item of input.ingredients) {
      const normalized = normalizedQuantity(item);
      const measurementId = await getOrCreateMeasurement(
        tx, item.ingredientId, normalized.unitCode,
        normalized.amount, normalized.maxAmount,
      );
      const association = await tx.recipeIngredient.create({
        data: { recipeId: recipe.id, measurementId },
        select: { id: true },
      });
      ingredientIds.set(item.key, association.id);
    }

    for (const [index, step] of input.steps.entries()) {
      const createdStep = await tx.recipeStep.create({
        data: {
          recipeId: recipe.id,
          position: index + 1,
          description: step.description,
          image: step.image ?? null,
          imageAlt: step.imageAlt ?? null,
          durationMinutes: step.durationMinutes ?? null,
        },
        select: { id: true },
      });

      for (const usage of step.ingredients ?? []) {
        const recipeIngredientId = ingredientIds.get(usage.ingredientKey);
        if (recipeIngredientId === undefined) {
          // Подстраховка: schema уже проверяет этот случай до транзакции.
          throw new Error(`Не найден ingredientKey: ${usage.ingredientKey}`);
        }
        await tx.stepIngredientUsage.create({
          data: {
            recipeId: recipe.id,
            stepId: createdStep.id,
            recipeIngredientId,
            fraction: usage.fraction == null ? null : usage.fraction.toFixed(6),
          },
        });
      }
    }
    return { id: recipe.id, slug: recipe.slug };
  }, { timeout: 20_000 });
}
