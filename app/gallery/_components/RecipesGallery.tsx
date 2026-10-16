
"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { foodPlaces, recipePlaces } from "../../data/foodPlaces";
import FoodMap from "./FoodMap";

import type { Recipe } from "../../data/recipes";
import { useDemoAuth } from "../../providers/DemoAuthProvider";
import RecipeModal from "./RecipeModal";
import styles from "../Gallery.module.css";

type RecipesGalleryProps = {
  recipes: Recipe[];
};

export default function RecipesGallery({
  recipes,
}: RecipesGalleryProps) {
  const { user } = useDemoAuth();

  // Рецепт, открытый в модальном окне.
  const [selectedRecipe, setSelectedRecipe] =
    useState<Recipe | null>(null);

  // Идентификаторы рецептов, добавленных в избранное.
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    () => new Set(),
  );

  // Карточка, на которую нужно вернуть фокус после закрытия.
  const selectedButtonRef = useRef<HTMLButtonElement | null>(
    null,
  );

  const closeModal = useCallback(() => {
    setSelectedRecipe(null);
  }, []);

  // Открываем рецепт, выбранный через карту.
  // Запоминаем кнопку для корректного возврата фокуса.
  const openRecipeFromMap = useCallback(
    (recipe: Recipe, trigger: HTMLButtonElement) => {
      selectedButtonRef.current = trigger;
      setSelectedRecipe(recipe);
    },
    [],
  );

  // Добавление или удаление рецепта из учебного избранного.
  function toggleFavorite(recipeId: string) {
    if (!user) {
      return;
    }

    setFavoriteIds((current) => {
      // Создаём новый Set, не изменяя предыдущее состояние.
      const next = new Set(current);

      if (next.has(recipeId)) {
        next.delete(recipeId);
      } else {
        next.add(recipeId);
      }

      return next;
    });
  }

  return (
    <>
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            type="button"
            className={styles.card}
            aria-haspopup="dialog"
            onClick={(event) => {
              selectedButtonRef.current = event.currentTarget;
              setSelectedRecipe(recipe);
            }}
          >
            <span className={styles.imageWrap}>
              {recipe.image ? (
                <Image
                  src={recipe.image}
                  alt={recipe.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                  loading={recipe.id === "pancakes" ? "eager" : "lazy"}
                  className={styles.image}
                />
              ) : (
                <span className={styles.placeholder}>
                  Фото пока отсутствует
                </span>
              )}
            </span>

            <span className={styles.cardContent}>
              <span className={styles.cardTitle}>
                {recipe.title}
              </span>

              <span className={styles.description}>
                {recipe.summary}
              </span>

              <span className={styles.meta}>
                {recipe.cuisine} · {recipe.cookingTimeMinutes} мин.
              </span>

              {user && favoriteIds.has(recipe.id) ? (
                <span className={styles.favoriteMark}>
                  ★ В избранном
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>

      <FoodMap
        places={foodPlaces}
        relations={recipePlaces}
        recipes={recipes}
        onOpenRecipe={openRecipeFromMap}
      />

      {selectedRecipe ? (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={closeModal}
          returnFocusRef={selectedButtonRef}
          isFavorite={favoriteIds.has(selectedRecipe.id)}
          onToggleFavorite={() =>
            toggleFavorite(selectedRecipe.id)
          }
        />
      ) : null}
    </>
  );
}
