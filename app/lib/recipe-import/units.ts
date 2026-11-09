// Единый справочник обозначений количеств для Prisma и импорта JSON.
// Коды совпадают с app/data/recipes.ts и RecipeDetails.tsx.
export const NUMERIC_UNITS = [
  "g",
  "kg",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "piece",
  "clove",
  "pinch",
  "slice",
] as const;

export const QUALITATIVE_UNITS = [
  "to-taste",
  "as-needed",
  "for-frying",
  "for-greasing",
  "for-serving",
] as const;

export const MEASUREMENT_UNITS = [
  { code: "g", name: "г", kind: "NUMERIC" },
  { code: "kg", name: "кг", kind: "NUMERIC" },
  { code: "ml", name: "мл", kind: "NUMERIC" },
  { code: "l", name: "л", kind: "NUMERIC" },
  { code: "tsp", name: "ч. л.", kind: "NUMERIC" },
  { code: "tbsp", name: "ст. л.", kind: "NUMERIC" },
  { code: "piece", name: "шт.", kind: "NUMERIC" },
  { code: "clove", name: "зубчик", kind: "NUMERIC" },
  { code: "pinch", name: "щепотка", kind: "NUMERIC" },
  { code: "slice", name: "ломтик", kind: "NUMERIC" },
  { code: "to-taste", name: "по вкусу", kind: "QUALITATIVE" },
  { code: "as-needed", name: "по необходимости", kind: "QUALITATIVE" },
  { code: "for-frying", name: "для жарки", kind: "QUALITATIVE" },
  { code: "for-greasing", name: "для смазывания", kind: "QUALITATIVE" },
  { code: "for-serving", name: "для подачи", kind: "QUALITATIVE" },
] as const;
