import Link from "next/link";
import FeatureCard from "./ui/FeatureCard";

export default function HomePage() {
  return (
    <main>
      <header>
        <p className="eyebrow">Учебный проект</p>
        <h1>Электронная книга рецептов</h1>
        <p>
          Приложение помогает находить, сохранять и использовать рецепты,
          подбирать блюда по известным ингредиентам и пересчитывать количество
          ингредиентов в зависимости от имеющихся продуктов или необходимого
          количества порций.
        </p>
      </header>

      <section aria-labelledby="audience-title">
        <h2 id="audience-title">Целевая аудитория</h2>
        <p>
          Домашние пользователи, начинающие кулинары, профессиональные повара
          и авторы кулинарного контента.
        </p>
      </section>

      <section aria-labelledby="features-title">
        <h2 id="features-title">Основные функции</h2>

        <div className="feature-list">
          <FeatureCard
            title="Каталог и поиск рецептов"
            description="Просмотр и поиск рецептов по названию, ингредиентам и категории кухни."
          />

          <FeatureCard
            title="Пересчёт ингредиентов"
            description="Автоматический пересчёт количества ингредиентов под нужное число порций или имеющиеся продукты."
          />

          <FeatureCard
            title="Избранные рецепты"
            description="Сохранение понравившихся рецептов для быстрого доступа к ним в дальнейшем."
          />
        </div>
      </section>

      <Link className="main-link" href="/about">
        Подробнее о проекте
      </Link>
    </main>
  );
}