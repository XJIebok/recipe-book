import { z } from "zod";
import { NUMERIC_UNITS, QUALITATIVE_UNITS } from "./units";

// PostgreSQL DECIMAL(12,3) хранит не более 9 цифр перед точкой
// и 3 цифр после. Не округляем внешние данные молча.
const DECIMAL_MAX = 999_999_999.999;
const fitsScale = (value: number, digits: number): boolean => {
  const factor = 10 ** digits;
  return Math.abs(value - Math.round(value * factor) / factor) < 1e-10;
};

const dbAmount = z.number().finite().positive().max(DECIMAL_MAX).refine(
  (value) => fitsScale(value, 3),
  "Допускается не более 3 знаков после запятой",
);

const fraction = z.number().finite().gt(0).lte(1).refine(
  (value) => fitsScale(value, 6) && Math.round(value * 1_000_000) > 0,
  "Доля должна помещаться в DECIMAL(8,6)",
);

const exactQuantity = z.object({
  type: z.literal("exact"),
  amount: dbAmount,
  unit: z.enum(NUMERIC_UNITS),
}).strict();

const rangeQuantity = z.object({
  type: z.literal("range"),
  min: dbAmount,
  max: dbAmount,
  unit: z.enum(NUMERIC_UNITS),
}).strict().refine((quantity) => quantity.max > quantity.min, {
  message: "Верхняя граница диапазона должна быть больше нижней",
  path: ["max"],
});

const qualitativeQuantity = z.object({
  type: z.literal("qualitative"),
  value: z.enum(QUALITATIVE_UNITS),
}).strict();

const quantitySchema = z.union([
  exactQuantity,
  rangeQuantity,
  qualitativeQuantity,
]);

const localKey = z.string().trim().min(1).max(100).regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Используйте строчные латинские буквы, цифры и дефисы",
);

const optionalText = (max: number) => z.string().trim().max(max).nullable().optional();

const recipeIngredientSchema = z.object({
  // Локальный ключ в JSON. Не является ID в PostgreSQL.
  key: localKey,
  ingredientId: localKey,
  // Используется лишь если новый ингредиент разрешено создать.
  ingredientName: z.string().trim().min(1).max(150).optional(),
  quantity: quantitySchema,
}).strict();

const stepUsageSchema = z.object({
  ingredientKey: localKey,
  // Отсутствие fraction означает «используется без указания расхода».
  fraction: fraction.nullable().optional(),
}).strict();

const recipeStepSchema = z.object({
  description: z.string().trim().min(1).max(10_000),
  image: optionalText(2048),
  imageAlt: optionalText(1000),
  durationMinutes: z.number().int().nonnegative().nullable().optional(),
  ingredients: z.array(stepUsageSchema).optional(),
}).strict();

export const recipeImportSchema = z.object({
  formatVersion: z.literal(1),
  title: z.string().trim().min(2).max(200),
  summary: z.string().trim().min(1).max(10_000),
  cuisine: z.enum(["ITALIAN", "RUSSIAN", "HOME_STYLE"]).nullable().optional(),
  baseServings: z.number().int().positive(),
  cookingTimeMinutes: z.number().int().nonnegative(),
  image: optionalText(2048),
  imageAlt: optionalText(1000),
  videoUrl: optionalText(2048),
  ingredients: z.array(recipeIngredientSchema).min(1).max(500),
  steps: z.array(recipeStepSchema).min(1).max(500),
}).strict().superRefine((recipe, context) => {
  const byKey = new Map(recipe.ingredients.map((item) => [item.key, item]));
  const seenKeys = new Set<string>();
  const seenMeasurements = new Set<string>();

  recipe.ingredients.forEach((item, index) => {
    if (seenKeys.has(item.key)) {
      context.addIssue({
        code: "custom", path: ["ingredients", index, "key"],
        message: `Повторяется локальный ключ ингредиента: ${item.key}`,
      });
    }
    seenKeys.add(item.key);

    // RecipeIngredient в БД уникален по (recipeId, measurementId).
    const q = item.quantity;
    const signature = q.type === "qualitative"
      ? `${item.ingredientId}|${q.value}|null|null`
      : q.type === "exact"
        ? `${item.ingredientId}|${q.unit}|${q.amount.toFixed(3)}|null`
        : `${item.ingredientId}|${q.unit}|${q.min.toFixed(3)}|${q.max.toFixed(3)}`;
    if (seenMeasurements.has(signature)) {
      context.addIssue({
        code: "custom", path: ["ingredients", index],
        message: "Дублируется одинаковое количество одного ингредиента в рецепте",
      });
    }
    seenMeasurements.add(signature);
  });

  recipe.steps.forEach((step, stepIndex) => {
    const usedKeys = new Set<string>();
    (step.ingredients ?? []).forEach((usage, usageIndex) => {
      const path = ["steps", stepIndex, "ingredients", usageIndex];
      const ingredient = byKey.get(usage.ingredientKey);
      if (!ingredient) {
        context.addIssue({
          code: "custom", path: [...path, "ingredientKey"],
          message: `Ингредиент с ключом ${usage.ingredientKey} не найден в этом рецепте`,
        });
      }
      if (usedKeys.has(usage.ingredientKey)) {
        context.addIssue({
          code: "custom", path: [...path, "ingredientKey"],
          message: "Ингредиент дважды указан в одном шаге",
        });
      }
      usedKeys.add(usage.ingredientKey);
      if (ingredient?.quantity.type === "qualitative" && usage.fraction != null) {
        context.addIssue({
          code: "custom", path: [...path, "fraction"],
          message: "Для качественного количества долю не задаём",
        });
      }
    });
  });
});

export type RecipeImportInput = z.infer<typeof recipeImportSchema>;
export type RecipeImportIngredient = RecipeImportInput["ingredients"][number];

export function parseRecipeImport(data: unknown): RecipeImportInput {
  return recipeImportSchema.parse(data);
}
