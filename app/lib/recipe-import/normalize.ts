import type { Recipe as LegacyRecipe } from "../../data/recipes";
import { parseRecipeImport, type RecipeImportInput } from "./validation";

const CUISINE_MAP: Record<string, "ITALIAN" | "RUSSIAN" | "HOME_STYLE"> = {
  "Итальянская": "ITALIAN",
  "Русская": "RUSSIAN",
  "Домашняя": "HOME_STYLE",
};

/**
 * Адаптер только для существующего app/data/recipes.ts.
 * В будущей форме импорта JSON будет сразу использоваться RecipeImportInput.
 */
export function fromLegacyRecipe(recipe: LegacyRecipe): RecipeImportInput {
  const cuisine = CUISINE_MAP[recipe.cuisine];
  if (!cuisine) {
    throw new Error(`У рецепта ${recipe.id} неизвестная кухня: ${recipe.cuisine}`);
  }

  const ingredientsByKey = new Map(
    recipe.ingredients.map((ingredient) => [ingredient.id, ingredient]),
  );

  const input = {
    formatVersion: 1,
    title: recipe.title,
    summary: recipe.summary,
    cuisine,
    baseServings: recipe.baseServings,
    cookingTimeMinutes: recipe.cookingTimeMinutes,
    image: recipe.image ?? null,
    imageAlt: recipe.imageAlt ?? null,
    videoUrl: recipe.videoUrl ?? null,
    ingredients: recipe.ingredients.map((item) => ({
      key: item.id,
      ingredientId: item.ingredientId,
      quantity: item.quantity,
    })),
    steps: recipe.steps.map((step) => ({
      description: step.description,
      ingredients: (step.ingredients ?? []).map((usage) => {
        const result: { ingredientKey: string; fraction?: number } = {
          ingredientKey: usage.recipeIngredientId,
        };
        if (usage.amount !== undefined) {
          const ingredient = ingredientsByKey.get(usage.recipeIngredientId);
          if (!ingredient || ingredient.quantity.type !== "exact") {
            throw new Error(
              `${recipe.id}: нельзя вычислить долю ${usage.recipeIngredientId}, ` +
              "так как исходное количество не является точным",
            );
          }
          // Числовая доля точно соответствует модели StepIngredientUsage.
          const rawFraction = usage.amount / ingredient.quantity.amount;
          if (!Number.isFinite(rawFraction) || rawFraction <= 0 || rawFraction > 1) {
            throw new Error(`${recipe.id}: неверная исходная доля ${usage.recipeIngredientId}`);
          }
          const rounded = Math.round(rawFraction * 1_000_000) / 1_000_000;
          if (rounded <= 0 || rounded > 1) {
            throw new Error(`${recipe.id}: некорректная доля ${usage.recipeIngredientId}`);
          }
          result.fraction = rounded;
        }
        return result;
      }),
    })),
  };

  return parseRecipeImport(input);
}
