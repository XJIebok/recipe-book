import { recipes } from "../data/recipes";
import RecipesGallery from "./_components/RecipesGallery";

export default function GalleryPage() {
  return (
    <main>
      <p className="eyebrow">Рецепты</p>

      <h1>Галерея рецептов</h1>

      <p>
        Выберите интересующее блюдо, чтобы посмотреть
        его описание и перейти к приготовлению.
      </p>

      <RecipesGallery recipes={recipes} />
    </main>
  );
}