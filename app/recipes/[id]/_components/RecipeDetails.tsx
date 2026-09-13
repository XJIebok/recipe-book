// Реализует интерактивное отображение ингридиентов и этапов приготовлени,
// а также локальный пересчёт количества ингридиентов без повторного получения рецепта.
"use client";

import { useState } from "react";
import { getIngredient } from "../../../data/ingredients";
import type {
  IngredientQuantity,
  Recipe,
  RecipeIngredient,
} from "../../../data/recipes";
import styles from "./RecipeDetails.module.css";

// Описываем данные, которые серверная страница передаёт криентскому компоненту.
type RecipeDetailsProps = {
  recipe: Recipe;
};

// Определение двух режимов изменения количества:
// только выбранный ингридиент или пропорциональный пересчёт всего рецепта.
type RecalculationMode = "single" | "all";

// Хранение состояня редактированрия одного ингридиента
type EditingState = {
  ingredientId: string;
  mode: RecalculationMode;
  value: string;
  error: string;
};

// Сопоставление внутренних обозначений единиц измерения с текстом для интерфейса
const unitLabels = {
  g: "г",
  kg: "кг",
  ml: "мл",
  l: "л",
  tsp: "ч. л.",
  tbsp: "ст. л.",
  piece: "шт.",
  clove: "зубчик",
  pinch: "щепотка",
  slice: "ломтик",
} as const;

// Сопоставление ненормированного количества с понятными пользователю подписями
const qualitativeLabels = {
  "to-taste": "по вкусу",
  "as-needed": "по необходимости",
  "for-frying": "для жарки",
  "for-greasing": "для смазывания",
  "for-serving": "для подачи",
} as const;

// Получение отображаемого названия ингридиента из общего справачника
function getIngredientName(
  recipeIngredient: RecipeIngredient,
): string {
  return (
    getIngredient(recipeIngredient.ingredientId)?.name ??
    recipeIngredient.ingredientId
  );
}

// Форматирование количества порций:
// целые значения выводятся как число, а заметно дробные как диапазон.
function formatServings(value: number): string {
  const rounded = Math.round(value);

  if (Math.abs(value - rounded) < 0.05) {
    return String(rounded);
  }

  return `${Math.floor(value)}–${Math.ceil(value)}`;
}

// Форматирование количества с учётом единицы измерения
// В состоянии сохраняется точное число, округление применяется только при выводе
function formatAmount(
  value: number,
  unit: keyof typeof unitLabels,
): string {
  switch (unit) {
    case "g":
    case "ml":
    case "pinch":
      return String(Math.round(value));

    case "piece":
    case "clove":
    case "slice":
    case "tsp":
    case "tbsp":
      return Number(value.toFixed(1)).toString();

    case "kg":
    case "l":
      return Number(value.toFixed(2)).toString();

    default:
      return Number(value.toFixed(2)).toString();
  }
}

// Форматирование итоговой строки количества для точных,
// диапазонных и ненормированных ингридиентов
function formatQuantity(quantity: IngredientQuantity): string {
  if (quantity.type === "qualitative") {
    return qualitativeLabels[quantity.value];
  }

  const unit = unitLabels[quantity.unit];

  if (quantity.type === "range") {
    return `${formatAmount(
      quantity.min,
      quantity.unit,
    )}–${formatAmount(
      quantity.max,
      quantity.unit,
    )} ${unit}`;
  }

  return `${formatAmount(
    quantity.amount,
    quantity.unit,
  )} ${unit}`;
}

// Создание локальной копии исходных количеств ингридиентов.
// Используется для интерактивного пересчёта без изменения самого объекта recipe
function createInitialQuantities(
  recipe: Recipe,
): Record<string, IngredientQuantity> {
  return Object.fromEntries(
    recipe.ingredients.map((ingredient) => [
      ingredient.id,
      ingredient.quantity,
    ]),
  );
}

// Сравнение исходного и текущего количества, чтобы определить,
// изменялся ли пользователем ингридиент
function quantityChanged(
  original: IngredientQuantity,
  current: IngredientQuantity,
): boolean {
  if (original.type !== current.type) {
    return true;
  }

  if (
    original.type === "exact" &&
    current.type === "exact"
  ) {
    return original.amount !== current.amount;
  }

  if (
    original.type === "range" &&
    current.type === "range"
  ) {
    return (
      original.min !== current.min ||
      original.max !== current.max
    );
  }

  if (
    original.type === "qualitative" &&
    current.type === "qualitative"
  ) {
    return original.value !== current.value;
  }

  return false;
}

// Объявление клиентского компонента с интерактивным состоянием рецепта
export default function RecipeDetails({
  recipe,
}: RecipeDetailsProps) {
  // Хранение текущего кол-ва ингридиентов отдельно от исходных данных рецепта
  const [quantities, setQuantities] = useState<
    Record<string, IngredientQuantity>
  >(() => createInitialQuantities(recipe));

  // Хранение текущего расчётного коли-ва порций после пропорциональных изменений
  const [currentServings, setCurrentServings] =
    useState(recipe.baseServings);

  // Хранение id ингридиента, для которого открыто меню действий
  const [openMenuId, setOpenMenuId] =
    useState<string | null>(null);

  // Хранение данных текущего редактируемого количества
  const [editing, setEditing] =
    useState<EditingState | null>(null);

  // Проверка, отличается ли хотя бы одно текущее кол-во от исходного 
  // (для кнопки сброса)
  const hasChanges = recipe.ingredients.some((ingredient) =>
    quantityChanged(
      ingredient.quantity,
      quantities[ingredient.id] ?? ingredient.quantity,
    ),
  );

  // Перевод выбранного ингридиента в режим редактирования
  // запоминание выбранного способа пересчёта
  function startEditing(
    ingredient: RecipeIngredient,
    mode: RecalculationMode,
  ) {
    const quantity =
      quantities[ingredient.id] ?? ingredient.quantity;

    if (quantity.type !== "exact") {
      return;
    }

    setOpenMenuId(null);

    setEditing({
      ingredientId: ingredient.id,
      mode,
      value: String(quantity.amount),
      error: "",
    });
  }

  // Применения введённого количества
  // В режиме single изменяется только выбранный ингридиент,
  // а в режиме all вычисляется коэффициент и масштабируется весь рецепт
  function applyEditing() {
    if (!editing) {
      return;
    }

    const newAmount = Number(editing.value.replace(",", "."));

    // Не допускаются пустые, отрицательные и некорректные числовые значения
    if (!Number.isFinite(newAmount) || newAmount <= 0) {
      setEditing({
        ...editing,
        error: "Введите число больше нуля.",
      });
      return;
    }

    const ingredient = recipe.ingredients.find(
      (item) => item.id === editing.ingredientId,
    );

    if (!ingredient) {
      setEditing(null);
      return;
    }

    const currentQuantity =
      quantities[ingredient.id] ?? ingredient.quantity;

    if (currentQuantity.type !== "exact") {
      setEditing(null);
      return;
    }

    if (editing.mode === "single") {
      setQuantities((current) => ({
        ...current,
        [ingredient.id]: {
          ...currentQuantity,
          amount: newAmount,
        },
      }));

      setEditing(null);
      return;
    }

    // Вычилление коэффициента относительно текущего количества,
    // поэтому повторные пересчёты выполняются последовательно
    const factor = newAmount / currentQuantity.amount;

    setQuantities((current) => {
      const next = { ...current };

      // Масштавирование числовых и диапазонных количеств,
      // оставляя качественные значения вроде "по вкусу" без изменений
      for (const recipeIngredient of recipe.ingredients) {
        const quantity =
          current[recipeIngredient.id] ??
          recipeIngredient.quantity;

        if (quantity.type === "exact") {
          next[recipeIngredient.id] = {
            ...quantity,
            amount: quantity.amount * factor,
          };
        } else if (quantity.type === "range") {
          next[recipeIngredient.id] = {
            ...quantity,
            min: quantity.min * factor,
            max: quantity.max * factor,
          };
        }
      }

      return next;
    });

    // Порции изменяются тем же коэфициентом, что и остальной рецепт
    setCurrentServings((current) => current * factor);
    setEditing(null);
  }

  // Возвращение всех количеств порций и числа порций к базовым
  function resetChanges() {
    setQuantities(createInitialQuantities(recipe));
    setCurrentServings(recipe.baseServings);
    setEditing(null);
    setOpenMenuId(null);
  }

  // Пересчитывание кол-ва ингридиентов внутри внутри отдельного этапа,
  // пропорционально изменению его общего кол-ва в рецепте
  function getStepAmount(
    recipeIngredient: RecipeIngredient,
    baseAmount: number,
  ): number {
    if (recipeIngredient.quantity.type !== "exact") {
      return baseAmount;
    }

    // Сравнение текущего кол-ва с исходным и применяем тот же коэффициент к этапу
    const currentQuantity =
      quantities[recipeIngredient.id] ??
      recipeIngredient.quantity;

    if (currentQuantity.type !== "exact") {
      return baseAmount;
    }

    const factor =
      currentQuantity.amount /
      recipeIngredient.quantity.amount;

    return baseAmount * factor;
  }

  return (
    <>
      {/* Вывод интреактивного списка ингридиентов и управление пересчётом */}
      <section>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Ингредиенты</h2>

            <p className={styles.servings}>
              Текущее количество порций:{" "}
              <strong>{formatServings(currentServings)}</strong>
            </p>
          </div>

          {/* Отображение кнопки сброса только фактического изменения рецепта */}
          {hasChanges ? (
            <button
              className={styles.resetButton}
              type="button"
              onClick={resetChanges}
            >
              Сбросить изменения
            </button>
          ) : null}
        </div>

        <ul className={styles.ingredientList}>
          {/* Построение строки для каждого ингридиента из исходного массива рецепта */}
          {recipe.ingredients.map((ingredient) => {
            const quantity =
              quantities[ingredient.id] ??
              ingredient.quantity;

            const isChanged = quantityChanged(
              ingredient.quantity,
              quantity,
            );

            const isEditing =
              editing?.ingredientId === ingredient.id;

            const canRecalculate =
              quantity.type === "exact";

            return (
              <li
                className={
                  isChanged
                    ? `${styles.ingredientRow} ${styles.changed}`
                    : styles.ingredientRow
                }
                key={ingredient.id}
              >
                <span>
                  {getIngredientName(ingredient)}
                </span>

                <div className={styles.quantity}>
                  {isEditing &&
                  quantity.type === "exact" ? (
                    <>
                      <input
                        className={styles.quantityInput}
                        type="number"
                        min="0.01"
                        step="any"
                        value={editing.value}
                        aria-label={`Количество ингредиента ${getIngredientName(
                          ingredient,
                        )}`}
                        onChange={(event) => {
                          setEditing({
                            ...editing,
                            value: event.target.value,
                            error: "",
                          });
                        }}
                        // Сразу выделяется старое значение, чтобы новое число можно было ввести без удаления
                        onFocus={(event) => {
                          event.currentTarget.select();
                        }}
                        // Enter применяет изменение через потерю фокуса,
                        // Escape отменяет текущее редактирование
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            event.currentTarget.blur();
                          }

                          if (event.key === "Escape") {
                            setEditing(null);
                          }
                        }}
                        onBlur={applyEditing}
                        autoFocus
                      />

                      <span>
                        {unitLabels[quantity.unit]}
                      </span>
                    </>
                  ) : (
                    <strong>
                      {formatQuantity(quantity)}
                    </strong>
                  )}

                  {isChanged ? (
                    <span className={styles.changedLabel}>
                      изменено
                    </span>
                  ) : null}
                </div>

                <div className={styles.actions}>
                  {canRecalculate ? (
                    <>
                      {/* Меню позволяет локальное изменение или пересчёт всего рецепта */}
                      <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={`Изменить количество ингредиента ${getIngredientName(
                          ingredient,
                        )}`}
                        aria-expanded={
                          openMenuId === ingredient.id
                        }
                        onClick={() => {
                          setOpenMenuId((current) =>
                            current === ingredient.id
                              ? null
                              : ingredient.id,
                          );
                        }}
                      >
                        ⋯
                      </button>

                      {openMenuId === ingredient.id ? (
                        <div
                          className={styles.actionMenu}
                          role="menu"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() =>
                              startEditing(
                                ingredient,
                                "single",
                              )
                            }
                          >
                            Изменить только этот ингридиент
                          </button>

                          <button
                            type="button"
                            role="menuitem"
                            onClick={() =>
                              startEditing(
                                ingredient,
                                "all",
                              )
                            }
                          >
                            Пересчитать весь рецепт
                          </button>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>

                {isEditing && editing.error ? (
                  <p className={styles.editError}>
                    {editing.error}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Вывод этапов приготовления с количествами,
          синхранизированными с текущим состоянием ингридиентов  */}
      <section>
        <h2>Приготовление</h2>

        <ol className={styles.recipeSteps}>
          {recipe.steps.map((step) => (
            <li key={step.id}>
              <p>{step.description}</p>

              {step.ingredients &&
              step.ingredients.length > 0 ? (
                <ul className={styles.stepIngredients}>
                  {step.ingredients.map((usage) => {
                    // Нахождение основного ингридиента, на который ссылается текущий этап
                    const recipeIngredient =
                      recipe.ingredients.find(
                        (ingredient) =>
                          ingredient.id ===
                          usage.recipeIngredientId,
                      );

                    if (!recipeIngredient) {
                      return null;
                    }

                    return (
                      <li key={usage.recipeIngredientId}>
                        {getIngredientName(
                          recipeIngredient,
                        )}

                        {usage.amount !== undefined &&
                        recipeIngredient.quantity.type !==
                          "qualitative"
                          ? ` — ${formatAmount(
                                getStepAmount(recipeIngredient, usage.amount),
                                recipeIngredient.quantity.unit,
                              )} ${
                              unitLabels[
                                recipeIngredient.quantity
                                  .unit
                              ]
                            }`
                          : ""}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}