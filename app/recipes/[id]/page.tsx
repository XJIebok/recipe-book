import Link from "next/link";
import { notFound } from "next/navigation";

import { getRecipe } from "../../data/recipes";
import RecipeDetails from "./_components/RecipeDetails";

type RecipePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecipePage({
  params,
}: RecipePageProps) {
  const { id } = await params;

  const recipe = getRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <main>
      <p className="eyebrow">Рецепт</p>

      <h1>{recipe.title}</h1>

      <p className="lead">{recipe.summary}</p>

      <section>
        <h2>О рецепте</h2>

        <dl className="recipe-info">
          <dt>Кухня</dt>
          <dd>{recipe.cuisine}</dd>

          <dt>Базовое количество порций</dt>
          <dd>{recipe.baseServings}</dd>

          <dt>Время приготовления</dt>
          <dd>{recipe.cookingTimeMinutes} мин.</dd>
        </dl>
      </section>

      <RecipeDetails recipe={recipe} />

      {recipe.videoUrl ? (
        <section>
          <h2>Видео</h2>
          <a href={recipe.videoUrl}>
            Открыть видео рецепта
          </a>
        </section>
      ) : null}

      <Link className="main-link" href="/recipes">
        Вернуться к каталогу
      </Link>
    </main>
  );
}