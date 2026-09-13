import Link from "next/link";
import { recipes } from "../data/recipes";

export default function RecipesPage() {
  return (
    <main>
      <h1>Каталог рецептов</h1>

      <p>
        Выберите рецепт, чтобы посмотреть подробную информацию о нём.
      </p>

      <div className="card-grid">
        {recipes.map((recipe) => (
          <article className="card" key={recipe.id}>
            <h2>{recipe.title}</h2>

            <p>{recipe.summary}</p>

            <p>
              <strong>Кухня:</strong> {recipe.cuisine}
            </p>

            <p>
              <strong>Время приготовления:</strong>{" "}
              {recipe.cookingTimeMinutes} мин.
            </p>

            <Link href={`/recipes/${recipe.id}`}>Открыть рецепт</Link>
          </article>
        ))}
      </div>
    </main>
  );
}