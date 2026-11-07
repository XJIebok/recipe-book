import "dotenv/config";
import { hash } from "bcrypt";
import { prisma } from "../app/lib/prisma";
import { ingredients } from "../app/data/ingredients";
import { recipes } from "../app/data/recipes";
import { MEASUREMENT_UNITS } from "../app/lib/recipe-import/units";
import { fromLegacyRecipe } from "../app/lib/recipe-import/normalize";
import { saveRecipe } from "../app/lib/recipe-import/save-recipe";

const DEMO_EMAIL = "demo@recipebook.local";

async function main() {
  // Валидация всех исходных рецептов ДО любых записей в БД.
  const adaptedRecipes = recipes.map((recipe) => ({
    slug: recipe.id,
    data: fromLegacyRecipe(recipe),
  }));

  // Пароль задаётся в локальном .env, никогда не коммитим его в репозиторий.
  const demoPassword = process.env.SEED_DEMO_PASSWORD;
  if (!demoPassword || demoPassword.length < 8) {
    throw new Error("Задайте SEED_DEMO_PASSWORD (не менее 8 символов) в .env");
  }

  for (const unit of MEASUREMENT_UNITS) {
    await prisma.measurementUnit.upsert({
      where: { code: unit.code },
      update: { name: unit.name, kind: unit.kind },
      create: { code: unit.code, name: unit.name, kind: unit.kind },
    });
  }

  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { id: ingredient.id },
      update: { name: ingredient.name },
      create: { id: ingredient.id, name: ingredient.name },
    });
  }

  // bcrypt-хеш сохраняется при первой регистрации demo-пользователя.
  // Повторный seed не меняет его пароль и не сбрасывает пользовательскую сессию.
  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: { name: "Демонстрационный пользователь" },
    create: {
      email: DEMO_EMAIL,
      name: "Демонстрационный пользователь",
      passwordHash: await hash(demoPassword, 12),
    },
  });

  for (const recipe of adaptedRecipes) {
    const saved = await saveRecipe(recipe.data, {
      mode: "replace-seeded",
      seedSlug: recipe.slug,
      allowCreateIngredients: false,
    });
    console.log(`Рецепт ${recipe.slug}: id=${saved.id}`);
  }

  const favoriteRecipe = await prisma.recipe.findUniqueOrThrow({
    where: { slug: "pancakes" }, select: { id: true },
  });
  await prisma.favoriteRecipe.upsert({
    where: { userId_recipeId: { userId: user.id, recipeId: favoriteRecipe.id } },
    create: { userId: user.id, recipeId: favoriteRecipe.id },
    update: {},
  });

  const [users, recipeCount, ingredientCount, unitCount, measurements,
    recipeIngredients, steps, usages, favorites] = await prisma.$transaction([
      prisma.user.count(),
      prisma.recipe.count(),
      prisma.ingredient.count(),
      prisma.measurementUnit.count(),
      prisma.ingredientMeasurement.count(),
      prisma.recipeIngredient.count(),
      prisma.recipeStep.count(),
      prisma.stepIngredientUsage.count(),
      prisma.favoriteRecipe.count(),
    ]);

  console.table({
    User: users,
    Recipe: recipeCount,
    Ingredient: ingredientCount,
    MeasurementUnit: unitCount,
    IngredientMeasurement: measurements,
    RecipeIngredient: recipeIngredients,
    RecipeStep: steps,
    StepIngredientUsage: usages,
    FavoriteRecipe: favorites,
  });
}

main()
  .catch((error: unknown) => {
    console.error("Ошибка seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
