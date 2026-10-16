
"use client";

import Image from "next/image";
import Link from "next/link";
import { useDemoAuth } from "../../providers/DemoAuthProvider";
import {
  useEffect,
  useId,
  useRef,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

import type { Recipe } from "../../data/recipes";
import styles from "./RecipeModal.module.css";

type RecipeModalProps = {
  recipe: Recipe;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;

  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function RecipeModal({
  recipe,
  onClose,
  returnFocusRef,
  isFavorite,
  onToggleFavorite,
}: RecipeModalProps) {
  const { user } = useDemoAuth();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    // Запоминаем элемент, открывший модальное окно.
    const returnFocusButton = returnFocusRef.current;

    // Запоминаем исходное состояние прокрутки страницы.
    const previousOverflow = document.body.style.overflow;

    // Пока окно открыто, запрещаем прокрутку фона.
    document.body.style.overflow = "hidden";

    // Перемещаем фокус внутрь модального окна.
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      // Находим элементы, доступные для перехода Tab.
      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), ' +
          'input:not([disabled]), select:not([disabled]), ' +
          'textarea:not([disabled]), ' +
          '[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (!first || !last) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const activeElement = document.activeElement;
      const focusOutside = !dialogRef.current.contains(activeElement);

      // Shift + Tab с первого элемента переводит на последний.
      if (event.shiftKey && (activeElement === first || focusOutside)) {
        event.preventDefault();
        last.focus();
      }

      // Tab с последнего элемента переводит на первый.
      if (!event.shiftKey && (activeElement === last || focusOutside)) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // При закрытии возвращаем исходное состояние.
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusButton?.focus();
    };
  }, [onClose, returnFocusRef]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(event) => {
        // Закрываем только при нажатии на фон.
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <h2 id={titleId}>{recipe.title}</h2>

          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            type="button"
            aria-label="Закрыть окно"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.imageWrap}>
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.imageAlt}
              fill
              sizes="(max-width: 720px) calc(100vw - 64px), 632px"
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>
              Фото рецепта пока отсутствует
            </div>
          )}
        </div>

        <div className={styles.content}>
            <nav
                className={styles.navigation}
                aria-label="Переключение между рецептами"
                >
                <button
                    className={styles.navButton}
                    type="button"
                    disabled
                    title="Функция появится позже"
                >
                    ← Предыдущий
                </button>

                <button
                    className={styles.navButton}
                    type="button"
                    disabled
                    title="Функция появится позже"
                >
                    Следующий →
                </button>
            </nav>
            <p id={descriptionId}>{recipe.summary}</p>

            <dl className={styles.info}>
                <dt>Кухня</dt>
                <dd>{recipe.cuisine}</dd>

                <dt>Время приготовления</dt>
                <dd>{recipe.cookingTimeMinutes} мин.</dd>

                <dt>Количество порций</dt>
                <dd>{recipe.baseServings}</dd>
            </dl>
   
            <div className={styles.actions}>
                {user ? (
                    <button
                    className={styles.favoriteButton}
                    type="button"
                    aria-pressed={isFavorite}
                    onClick={onToggleFavorite}
                    >
                    {isFavorite
                        ? "★ Удалить из избранного"
                        : "☆ Добавить в избранное"}
                    </button>
                ) : (
                    <Link
                    className={styles.loginLink}
                    href="/auth/login"
                    >
                        Войти, чтобы добавить в избранное
                    </Link>
                )}

                <Link
                    className={styles.recipeLink}
                    href={`/recipes/${recipe.id}`}
                >
                    Открыть полный рецепт
                </Link>
            </div>

            <p className={styles.favoriteNote}>
                Избранное работает в демонстрационном режиме.
                Оно не сохраняется в базе данных и сбрасывается
                при обновлении страницы.
            </p>

        </div>
      </div>
    </div>,
    document.body,
  );
}
