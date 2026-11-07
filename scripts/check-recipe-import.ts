/** Проверка исходных рецептов без подключения к PostgreSQL. */
import { recipes } from "../app/data/recipes";
import { fromLegacyRecipe } from "../app/lib/recipe-import/normalize";

const inputs = recipes.map(fromLegacyRecipe);
const stats = {
  recipes: inputs.length,
  recipeIngredients: inputs.reduce((sum, item) => sum + item.ingredients.length, 0),
  steps: inputs.reduce((sum, item) => sum + item.steps.length, 0),
  stepUsages: inputs.reduce((sum, item) => sum + item.steps.reduce(
    (stepSum, step) => stepSum + (step.ingredients?.length ?? 0), 0,
  ), 0),
};
console.table(stats);
const milk = inputs.find((recipe) => recipe.title === "Домашние блины");
const fractions = milk?.steps.flatMap((step) => step.ingredients ?? [])
  .filter((usage) => usage.ingredientKey === "pancakes-milk")
  .map((usage) => usage.fraction);
if (!fractions || fractions.length !== 2 || fractions.some((value) => value !== 0.5)) {
  throw new Error("Неправильно преобразованы 250 мл из 500 мл для блинов");
}
console.log("Проверка JSON и долей пройдена; БД не изменялась.");
