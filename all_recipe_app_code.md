# Recipe App Code Snapshot

Generated: 2026-10-16 12:13

Files: 29

# ./app/about/page.tsx

```tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <h1>О проекте «Электронная книга рецептов»</h1>

      <section>
        <h2>Цель разработки</h2>
        <p>
          Создать веб-приложение для удобного поиска, хранения и использования
          рецептов, а также для подбора блюд по ингредиентам и автоматического
          пересчёта их количества.
        </p>
      </section>

      <section>
        <h2>Будущий результат</h2>
        <p>
          К завершению курса приложение будет представлять собой связанную
          систему страниц для просмотра и поиска рецептов, работы с отдельными
          рецептами, сохранения избранного и взаимодействия пользователя
          с собственным кулинарным контентом.
        </p>
      </section>

      <section>
        <h2>Основная предметная сущность</h2>
        <p>Рецепт.</p>
      </section>

      <section>
        <h2>Предполагаемые разделы</h2>
        <ul>
          <li>главная страница;</li>
          <li>каталог рецептов;</li>
          <li>страница отдельного рецепта;</li>
          <li>избранные рецепты;</li>
          <li>личный кабинет.</li>
        </ul>
      </section>

      <Link className="main-link" href="/">
        Вернуться на главную страницу
      </Link>
    </main>
  );
}
```

# ./app/account/page.tsx

```tsx
"use client";

import Link from "next/link";

import { useDemoAuth } from "../providers/DemoAuthProvider";

export default function AccountPage() {
  const { user, logout } = useDemoAuth();

  if (!user) {
    return (
      <main>
        <p className="eyebrow">Пользователь</p>

        <h1>Личный кабинет</h1>

        <p>
          Вы не вошли в учебную учётную запись.
        </p>

        <Link className="main-link" href="/auth/login">
          Перейти ко входу
        </Link>
      </main>
    );
  }

  return (
    <main>
      <p className="eyebrow">Пользователь</p>

      <h1>Личный кабинет</h1>

      <dl className="profile-list">
        <dt>Имя</dt>
        <dd>{user.name}</dd>

        <dt>Email</dt>
        <dd>{user.email}</dd>
      </dl>

      <button
        className="secondary-button"
        type="button"
        onClick={logout}
      >
        Выйти
      </button>
    </main>
  );
}
```

# ./app/auth/Auth.module.css

```css
.formPage {
  width: min(560px, calc(100% - 32px));
}

.warning {
  margin: 24px 0;
  padding: 14px 16px;

  border-left: 4px solid #b86b35;
  border-radius: 6px;

  background: rgb(247 232 218 / 96%);
  line-height: 1.5;
}

.form {
  display: grid;
  gap: 10px;

  margin: 24px 0;
  padding: 24px;

  border: 1px solid #d8cfc5;
  border-radius: 14px;

  background: rgb(255 255 255 / 94%);
  box-shadow: 0 4px 18px rgb(47 42 37 / 7%);
}

.form label {
  margin-top: 8px;
  font-weight: 700;
}

.form input {
  width: 100%;
  min-height: 44px;
  padding: 9px 12px;
  border: 1px solid #b9aea3;
  border-radius: 8px;
  background: #ffffff;
  color: #2f2a25;
  font: inherit;
}

.form input:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 2px;
  border-color: #8b4a2f;
}

.form button {
  min-height: 44px;
  margin-top: 16px;
  padding: 10px 16px;
  border: 0;
  border-radius: 8px;
  background: #8b4a2f;
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.form button:hover {
  background: #713b27;
}

.form button:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 3px;
}

.error {
  margin: 0;
  color: #9d2929;
  font-weight: 700;
}

.authLink {
  color: #8b4a2f;
  font-weight: 700;
}
```

# ./app/auth/login/page.tsx

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    useState,
    type FormEvent,
} from "react";
import {
    PASSWORD_MIN_LENGTH,
    validateEmail,
    validatePassword,
} from "../../validation/auth";
import { useDemoAuth } from "../../providers/DemoAuthProvider";
import styles from "../Auth.module.css";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useDemoAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newEmailError = validateEmail(email);
        const newPasswordError = validatePassword(password);

        setEmailError(newEmailError ?? "");
        setPasswordError(newPasswordError ?? "");

        if (newEmailError || newPasswordError) {
            return;
        }

        login(email.trim());
        router.push("/account");
    }

    return (
        <main className={styles.formPage}>
        <h1>Вход</h1>

        <p className={styles.warning}>
            Учебный прототип авторизации: пароль не проверяется
            сервером, а состояние пользователя сохраняется только до
            обновления страницы.
        </p>

        <form 
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
        >
            <label htmlFor="email">Email</label>

            <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                    const newEmail = event.target.value;

                    setEmail(newEmail);

                    if (emailError) {
                    setEmailError(validateEmail(newEmail) ?? "");
                    }
                }}
                onBlur={() => {
                    setEmailError(validateEmail(email) ?? "");
                }}
                autoComplete="email"
                required
            />

            {emailError ? (
                <p className={styles.error}>{emailError}</p>
            ) : null}

            <label htmlFor="password">Пароль</label>

            <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                    const newPassword = event.target.value;

                    setPassword(newPassword);

                    if (passwordError) {
                    setPasswordError(validatePassword(newPassword) ?? "");
                    }
                }}
                onBlur={() => {
                    setPasswordError(validatePassword(password) ?? "");
                }}
                autoComplete="current-password"
                minLength={PASSWORD_MIN_LENGTH}
                required
            />

            {passwordError ? (
                <p className={styles.error}>{passwordError}</p>
            ) : null}

            <button type="submit">Войти</button>
        </form>

        <p>
            Нет учебной записи?{" "}
            <Link
                className={styles.authLink}
                href="/auth/register"
            >
                Зарегистрироваться
            </Link>
        </p>
        </main>
    );
}
```

# ./app/auth/register/page.tsx

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    useState,
    type FormEvent,
} from "react";
import {
    PASSWORD_MIN_LENGTH,
    validateEmail,
    validateName,
    validatePassword,
    validatePasswordConfirmation,
} from "../../validation/auth";
import { useDemoAuth } from "../../providers/DemoAuthProvider";
import styles from "../Auth.module.css";

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useDemoAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmationError, setConfirmationError] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newNameError = validateName(name);
        const newEmailError = validateEmail(email);
        const newPasswordError = validatePassword(password);
        const newConfirmationError =
            validatePasswordConfirmation(password, confirmation);

        setNameError(newNameError ?? "");
        setEmailError(newEmailError ?? "");
        setPasswordError(newPasswordError ?? "");
        setConfirmationError(newConfirmationError ?? "");

        if (
            newNameError ||
            newEmailError ||
            newPasswordError ||
            newConfirmationError
        ) {
            return;
        }

        register(name.trim(), email.trim());
        router.push("/account");
    }

    return (
        <main className={styles.formPage}>
        <h1>Регистрация</h1>

        <p className={styles.warning}>
            Учебный прототип авторизации: данные пользователя существуют
            только до обновления страницы и не записываются в базу данных.
        </p>

        <form 
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
        >
            <label htmlFor="name">Имя</label>

            <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => {
                    const newName = event.target.value;

                    setName(newName);

                    if (nameError) {
                    setNameError(validateName(newName) ?? "");
                    }
                }}
                onBlur={() => {
                    setNameError(validateName(name) ?? "");
                }}
                autoComplete="name"
                required
            />

            {nameError ? (
                <p className={styles.error}>{nameError}</p>
            ) : null}

            <label htmlFor="email">Email</label>

            <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                    const newEmail = event.target.value;

                    setEmail(newEmail);

                    if (emailError) {
                    setEmailError(validateEmail(newEmail) ?? "");
                    }
                }}
                onBlur={() => {
                    setEmailError(validateEmail(email) ?? "");
                }}
                autoComplete="email"
                required
            />

            {emailError ? (
                <p className={styles.error}>{emailError}</p>
            ) : null}

            <label htmlFor="password">Пароль</label>

            <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                    const newPassword = event.target.value;

                    setPassword(newPassword);

                    if (passwordError) {
                    setPasswordError(validatePassword(newPassword) ?? "");
                    }

                    if (confirmation) {
                    setConfirmationError(
                        validatePasswordConfirmation(
                        newPassword,
                        confirmation,
                        ) ?? "",
                    );
                    }
                }}
                onBlur={() => {
                    setPasswordError(validatePassword(password) ?? "");

                    if (confirmation) {
                    setConfirmationError(
                        validatePasswordConfirmation(
                        password,
                        confirmation,
                        ) ?? "",
                    );
                    }
                }}
                autoComplete="new-password"
                minLength={PASSWORD_MIN_LENGTH}
                required
            />

            {passwordError ? (
                <p className={styles.error}>{passwordError}</p>
            ) : null}

            <label htmlFor="confirmation">
                Повторите пароль
            </label>

            <input
                id="confirmation"
                type="password"
                value={confirmation}
                onChange={(event) => {
                    const newConfirmation = event.target.value;

                    setConfirmation(newConfirmation);

                    if (confirmationError) {
                        setConfirmationError(
                            validatePasswordConfirmation(
                            password,
                            newConfirmation,
                            ) ?? "",
                        );
                    }
                }}
                onBlur={() => {
                    setConfirmationError(
                        validatePasswordConfirmation(
                            password,
                            confirmation,
                        ) ?? "",
                    );
                }}
                autoComplete="new-password"
                minLength={PASSWORD_MIN_LENGTH}
                required
            />

            {confirmationError ? (
                <p className={styles.error}>{confirmationError}</p>
            ) : null}

            <button type="submit">
            Зарегистрироваться
            </button>
        </form>

        <p>
            Уже есть учётная запись?{" "}
            <Link
                className={styles.authLink}
                href="/auth/login"
            >
                Войти
            </Link>
        </p>
        </main>
    );
}
```

# ./app/data/foodPlaces.ts

```typescript

export type FoodPlaceCategory =
  | "store"
  | "restaurant"
  | "scenic";

export type FoodPlace = {
  id: string;
  name: string;
  description: string;
  address: string;
  category: FoodPlaceCategory;

  latitude: number;
  longitude: number;

  yandexMapsUrl?: string;
};

export type RecipePlace = {
  recipeId: string;
  placeId: string;
};

// Три реальные географические точки рядом с ГУАП.
// Связи с рецептами пока демонстрационные.
export const foodPlaces: FoodPlace[] = [
  {
    id: "magnit-pirogova",
    name: "Магнит",
    description: "Продуктовый магазин для покупки ингредиентов.",
    address: "Санкт-Петербург, переулок Пирогова, 17",
    category: "store",
    latitude: 59.92897,
    longitude: 30.301998,
    yandexMapsUrl:
      "https://yandex.com/maps/org/magnit/211876444409/",
  },
  {
    id: "teremok-truda",
    name: "Теремок",
    description:
      "Кафе русской кухни, где можно попробовать блины " +
      "со сладкими и сытными начинками.",
    address: "Санкт-Петербург, площадь Труда, 3",
    category: "restaurant",

    latitude: 59.931829,
    longitude: 30.291317,

    yandexMapsUrl:
      "https://yandex.com/maps/org/teremok/180347490121/",
  },
  {
    id: "new-holland",
    name: "Новая Голландия",
    description: "Общественное пространство для отдыха и прогулок.",
    address: "Санкт-Петербург, наб. Адмиралтейского канала, 2",
    category: "scenic",
    latitude: 59.92943,
    longitude: 30.290401,
    yandexMapsUrl:
      "https://yandex.com/maps/org/ostrov_novaya_gollandiya/199688219277/",
  },
];

// Одна точка может относиться к нескольким рецептам,
// а рецепт может иметь несколько связанных точек.
export const recipePlaces: RecipePlace[] = [
  { recipeId: "pancakes", placeId: "magnit-pirogova" },
  { recipeId: "solyanka", placeId: "magnit-pirogova" },
  {
    recipeId: "cottage-cheese-casserole",
    placeId: "magnit-pirogova",
  },
  { recipeId: "pancakes", placeId: "teremok-truda" },
  { recipeId: "pancakes", placeId: "new-holland" },
  {
    recipeId: "cottage-cheese-casserole",
    placeId: "new-holland",
  },
];

export function getPlacesForRecipe(recipeId: string): FoodPlace[] {
  const placeIds = new Set(
    recipePlaces
      .filter((relation) => relation.recipeId === recipeId)
      .map((relation) => relation.placeId),
  );

  return foodPlaces.filter((place) => placeIds.has(place.id));
}

// Переход к координатам во внешних Яндекс Картах,
// если ссылка на карточку организации не указана.
export function getYandexMapsUrl(place: FoodPlace): string {
  if (place.yandexMapsUrl) {
    return place.yandexMapsUrl;
  }

  const coordinates = `${place.latitude},${place.longitude}`;

  return `https://yandex.ru/maps/?text=${encodeURIComponent(coordinates)}`;
}
```

# ./app/data/ingredients.ts

```typescript
// Описывает фиксированный справочник ингредиентов приложения.

export type Ingredient = {
  id: string;
  name: string;
};

export const ingredients: Ingredient[] = [
  { id: "spaghetti", name: "Спагетти" },
  { id: "egg", name: "Яйцо" },
  { id: "pecorino", name: "Сыр пекорино" },
  { id: "guanciale", name: "Гуанчале" },
  { id: "black-pepper", name: "Чёрный перец" },
  { id: "salt", name: "Соль" },

  { id: "flour", name: "Пшеничная мука" },
  { id: "milk", name: "Молоко" },
  { id: "sugar", name: "Сахар" },
  { id: "vegetable-oil", name: "Растительное масло" },

  { id: "chicken-breast", name: "Куриная грудка" },
  { id: "potato", name: "Картофель" },
  { id: "carrot", name: "Морковь" },
  { id: "onion", name: "Репчатый лук" },
  { id: "water", name: "Вода" },

  { id: "cottage-cheese", name: "Творог" },
  { id: "starch", name: "Крахмал" },
  { id: "sour-cream", name: "Сметана" },
  { id: "vanillin", name: "Ванилин" },
  { id: "lemon-zest", name: "Цедра лимона" },
  { id: "orange-zest", name: "Цедра апельсина" },

  { id: "hunting-sausages", name: "Охотничьи сосиски" },
  { id: "creamy-sausages", name: "Сливочные сосиски" },
  { id: "ham", name: "Ветчина" },
  { id: "tomato-paste", name: "Томатная паста" },
  { id: "dill", name: "Укроп" },
  { id: "parsley", name: "Петрушка" },

];

export function getIngredient(id: string): Ingredient | undefined {
  return ingredients.find((ingredient) => ingredient.id === id);
}
```

# ./app/data/recipes.ts

```typescript
// Описывает рецепты, их ингредиенты и этапы приготовления.

export type MeasurementUnit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "tsp"
  | "tbsp"
  | "piece"
  | "clove"
  | "pinch"
  | "slice";

export type QualitativeQuantity =
  | "to-taste"
  | "as-needed"
  | "for-frying"
  | "for-greasing"
  | "for-serving";

export type IngredientQuantity =
  | {
      type: "exact";
      amount: number;
      unit: MeasurementUnit;
    }
  | {
      type: "range";
      min: number;
      max: number;
      unit: MeasurementUnit;
    }
  | {
      type: "qualitative";
      value: QualitativeQuantity;
    };

// Описание ингридиента с id, названием и кол-вом с единицами измерения?
export type RecipeIngredient = {
  id: string;
  ingredientId: string;
  quantity: IngredientQuantity;
};

// Описание используемого на этапе ингридиента с возможным кол-вом
export type StepIngredientUsage = {
  recipeIngredientId: string;
  amount?: number;
};

// Описание шага приготовления
export type RecipeStep = {
  id: string;
  description: string;
  ingredients?: StepIngredientUsage[];
};
// Полное описание рецепта
export type Recipe = {
  id: string;
  title: string;
  summary: string;

  cuisine: string;
  baseServings: number;
  cookingTimeMinutes: number;

  ingredients: RecipeIngredient[];
  steps: RecipeStep[];

  image?: string;
  imageAlt: string;
  videoUrl?: string;
};

export const recipes: Recipe[] = [
  {
    id: "carbonara",
    title: "Паста карбонара",
    summary:
      "Итальянская паста с гуанчале, яйцом, сыром пекорино и чёрным перцем.",
    imageAlt: "Паста карбонара с сыром и чёрным перцем",
    cuisine: "Итальянская",
    baseServings: 2,
    cookingTimeMinutes: 25,

    ingredients: [
      {
        id: "carbonara-spaghetti",
        ingredientId: "spaghetti",
        quantity: {
          type: "exact",
          amount: 200,
          unit: "g",
        },
      },
      {
        id: "carbonara-eggs",
        ingredientId: "egg",
        quantity: {
          type: "exact",
          amount: 2,
          unit: "piece",
        },
      },
      {
        id: "carbonara-pecorino",
        ingredientId: "pecorino",
        quantity: {
          type: "exact",
          amount: 60,
          unit: "g",
        },
      },
      {
        id: "carbonara-guanciale",
        ingredientId: "guanciale",
        quantity: {
          type: "exact",
          amount: 100,
          unit: "g",
        },
      },
      {
        id: "carbonara-pepper",
        ingredientId: "black-pepper",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "pinch",
        },
      },
      {
        id: "carbonara-salt",
        ingredientId: "salt",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
    ],

    steps: [
      {
        id: "carbonara-step-1",
        description: "Отварить спагетти до состояния al dente.",
        ingredients: [
          { recipeIngredientId: "carbonara-spaghetti" },
          { recipeIngredientId: "carbonara-salt" },
        ],
      },
      {
        id: "carbonara-step-2",
        description: "Обжарить нарезанный гуанчале.",
        ingredients: [{ recipeIngredientId: "carbonara-guanciale" }],
      },
      {
        id: "carbonara-step-3",
        description:
          "Смешать яйца с тёртым пекорино и чёрным перцем.",
        ingredients: [
          { recipeIngredientId: "carbonara-eggs" },
          { recipeIngredientId: "carbonara-pecorino" },
          { recipeIngredientId: "carbonara-pepper" },
        ],
      },
      {
        id: "carbonara-step-4",
        description:
          "Соединить горячую пасту с гуанчале и яично-сырной смесью.",
      },
    ],
  },

  {
    id: "pancakes",
    title: "Домашние блины",
    summary:
      "Тонкие блины на молоке, подходящие для сладких и несладких начинок.",
    image: "/images/recipes/pancakes.jpg",
    imageAlt: "Домашние блины на молоке",
    cuisine: "Русская",
    baseServings: 4,
    cookingTimeMinutes: 35,

    ingredients: [
      {
        id: "pancakes-flour",
        ingredientId: "flour",
        quantity: {
          type: "exact",
          amount: 200,
          unit: "g",
        },
      },
      {
        id: "pancakes-milk",
        ingredientId: "milk",
        quantity: {
          type: "exact",
          amount: 500,
          unit: "ml",
        },
      },
      {
        id: "pancakes-eggs",
        ingredientId: "egg",
        quantity: {
          type: "exact",
          amount: 2,
          unit: "piece",
        },
      },
      {
        id: "pancakes-sugar",
        ingredientId: "sugar",
        quantity: {
          type: "exact",
          amount: 40,
          unit: "g",
        },
      },
      {
        id: "pancakes-salt",
        ingredientId: "salt",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "pinch",
        },
      },
      {
        id: "pancakes-oil",
        ingredientId: "vegetable-oil",
        quantity: {
          type: "exact",
          amount: 30,
          unit: "ml",
        },
      },
    ],

    steps: [
      {
        id: "pancakes-step-1",
        description:
          "Смешать яйца, сахар и соль до однородного состояния.",
        ingredients: [
          { recipeIngredientId: "pancakes-eggs" },
          { recipeIngredientId: "pancakes-sugar" },
          { recipeIngredientId: "pancakes-salt" },
        ],
      },
      {
        id: "pancakes-step-2",
        description:
          "Добавить половину молока и постепенно вмешать муку.",
        ingredients: [
          {
            recipeIngredientId: "pancakes-milk",
            amount: 250,
          },
          { recipeIngredientId: "pancakes-flour" },
        ],
      },
      {
        id: "pancakes-step-3",
        description:
          "Добавить оставшееся молоко и растительное масло.",
        ingredients: [
          {
            recipeIngredientId: "pancakes-milk",
            amount: 250,
          },
          { recipeIngredientId: "pancakes-oil" },
        ],
      },
      {
        id: "pancakes-step-4",
        description:
          "Выпекать блины с обеих сторон на хорошо разогретой сковороде.",
      },
    ],
  },

  {
    id: "chicken-soup",
    title: "Куриный суп",
    summary:
      "Простой домашний суп с куриной грудкой, картофелем и овощами.",
    imageAlt: "Куриный суп",
    cuisine: "Домашняя",
    baseServings: 4,
    cookingTimeMinutes: 50,

    ingredients: [
      {
        id: "soup-chicken",
        ingredientId: "chicken-breast",
        quantity: {
          type: "exact",
          amount: 400,
          unit: "g",
        },
      },
      {
        id: "soup-water",
        ingredientId: "water",
        quantity: {
          type: "exact",
          amount: 1500,
          unit: "ml",
        },
      },
      {
        id: "soup-potato",
        ingredientId: "potato",
        quantity: {
          type: "exact",
          amount: 3,
          unit: "piece",
        },
      },
      {
        id: "soup-carrot",
        ingredientId: "carrot",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "piece",
        },
      },
      {
        id: "soup-onion",
        ingredientId: "onion",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "piece",
        },
      },
      {
        id: "soup-salt",
        ingredientId: "salt",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
      {
        id: "soup-pepper",
        ingredientId: "black-pepper",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
    ],

    steps: [
      {
        id: "soup-step-1",
        description:
          "Залить куриную грудку водой и варить до готовности.",
        ingredients: [
          { recipeIngredientId: "soup-chicken" },
          { recipeIngredientId: "soup-water" },
        ],
      },
      {
        id: "soup-step-2",
        description:
          "Добавить нарезанные картофель, морковь и репчатый лук.",
        ingredients: [
          { recipeIngredientId: "soup-potato" },
          { recipeIngredientId: "soup-carrot" },
          { recipeIngredientId: "soup-onion" },
        ],
      },
      {
        id: "soup-step-3",
        description:
          "В конце приготовления добавить соль и чёрный перец по вкусу.",
        ingredients: [
          { recipeIngredientId: "soup-salt" },
          { recipeIngredientId: "soup-pepper" },
        ],
      },
    ],
  },

  {
    id: "solyanka",
    title: "Домашняя солянка с сосисками и ветчиной",
    summary:
      "Сытная домашняя солянка с охотничьими и сливочными " +
      "сосисками, ветчиной, картофелем и томатной зажаркой.",
    image: "/images/recipes/solyanka.jpg",
    imageAlt: "Домашняя солянка с сосиками и ветчиной",
    cuisine: "Русская",
    baseServings: 10,
    cookingTimeMinutes: 50,

    ingredients: [
      {
        id: "solyanka-hunting-sausages",
        ingredientId: "hunting-sausages",
        quantity: {
          type: "exact",
          amount: 500,
          unit: "g",
        },
      },
      {
        id: "solyanka-creamy-sausages",
        ingredientId: "creamy-sausages",
        quantity: {
          type: "exact",
          amount: 500,
          unit: "g",
        },
      },
      {
        id: "solyanka-ham",
        ingredientId: "ham",
        quantity: {
          type: "exact",
          amount: 500,
          unit: "g",
        },
      },
      {
        id: "solyanka-potato",
        ingredientId: "potato",
        quantity: {
          type: "exact",
          amount: 4,
          unit: "piece",
        },
      },
      {
        id: "solyanka-onion",
        ingredientId: "onion",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "piece",
        },
      },
      {
        id: "solyanka-carrot",
        ingredientId: "carrot",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "piece",
        },
      },
      {
        id: "solyanka-tomato-paste",
        ingredientId: "tomato-paste",
        quantity: {
          type: "exact",
          amount: 2,
          unit: "tbsp",
        },
      },
      
      {
        id: "solyanka-water",
        ingredientId: "water",
        quantity: {
          type: "exact",
          amount: 3,
          unit: "l",
        },
      },

      {
        id: "solyanka-dill",
        ingredientId: "dill",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
      {
        id: "solyanka-parsley",
        ingredientId: "parsley",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
      {
        id: "solyanka-salt",
        ingredientId: "salt",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
      {
        id: "solyanka-sour-cream",
        ingredientId: "sour-cream",
        quantity: {
          type: "qualitative",
          value: "for-serving",
        },
      },
    ],

    steps: [      
      {
        id: "solyanka-step-1",
        description:
          "В кастрюлю объёмом 5 литров налить 3 литра воды " +
          "и поставить на огонь. Довести до кипения, " +
          "затем выключить нагрев. Вода понадобится " +
          "для дальнейшего приготовления супа.",
        ingredients: [
          { recipeIngredientId: "solyanka-water" },
        ],
      },

      {
        id: "solyanka-step-2",
        description:
          "Подготовить ингредиенты. Охотничьи и сливочные " +
          "сосиски нарезать кружочками, ветчину — мелкими " +
          "кубиками. Картофель, морковь и лук очистить. " +
          "Картофель нарезать кубиками размером около 1 см, " +
          "морковь — соломкой, а лук — мелкими кубиками.",
      },
      {
        id: "solyanka-step-3",
        description:
          "Разогреть глубокую сковороду диаметром около 28 см. " +
          "Выложить охотничьи сосиски и обжаривать без " +
          "добавления масла, периодически перемешивая. " +
          "Сосиски выделят собственный жир. После обжаривания " +
          "переложить их шумовкой в отдельную миску, " +
          "оставив жир на сковороде.",
        ingredients: [
          { recipeIngredientId: "solyanka-hunting-sausages" },
        ],
      },
      {
        id: "solyanka-step-4",
        description:
          "В той же сковороде на оставшемся жире обжарить " +
          "сливочные сосиски, периодически перемешивая. " +
          "Переложить их шумовкой в миску к охотничьим " +
          "сосискам, оставив жир на сковороде.",
        ingredients: [
          { recipeIngredientId: "solyanka-creamy-sausages" },
        ],
      },
      {
        id: "solyanka-step-5",
        description:
          "Аналогичным образом обжарить нарезанную ветчину. " +
          "После обжаривания переложить её в общую миску " +
          "с сосисками, сохранив оставшийся жир в сковороде.",
        ingredients: [
          { recipeIngredientId: "solyanka-ham" },
        ],
      },
      {
        id: "solyanka-step-6",
        description:
          "В той же сковороде слегка обжарить мелко " +
          "нарезанный лук. Добавить морковь, нарезанную " +
          "соломкой, перемешать и продолжить обжаривание.",
        ingredients: [
          { recipeIngredientId: "solyanka-onion" },
          { recipeIngredientId: "solyanka-carrot" },
        ],
      },
      {
        id: "solyanka-step-7",
        description:
          "Снова включить нагрев под кастрюлей с водой " +
          "и довести её до кипения. Добавить нарезанный " +
          "картофель. Дождаться повторного закипания " +
          "и посолить по вкусу. Оставить картофель вариться.",
        ingredients: [
          { recipeIngredientId: "solyanka-potato" },
          { recipeIngredientId: "solyanka-salt" },
        ],
      },
      {
        id: "solyanka-step-8",
        description:
          "Пока варится картофель, добавить в сковороду " +
          "к луку и моркови томатную пасту и перемешать. " +
          "Вернуть в сковороду все ранее обжаренные " +
          "сосиски и ветчину из миски. Тщательно " +
          "перемешать и прогреть на слабом огне.",
        ingredients: [
          { recipeIngredientId: "solyanka-tomato-paste" },
        ],
      },
      {
        id: "solyanka-step-9",
        description:
          "Через 10 минут после повторного закипания воды " +
          "с картофелем проверить его готовность. " +
          "Если картофель ещё твёрдый, продолжить варку. " +
          "Когда он будет готов, переложить всё содержимое " +
          "сковороды в кастрюлю и перемешать.",
      },
      {
        id: "solyanka-step-10",
        description:
          "Мелко нарезать свежий укроп и петрушку. " +
          "Добавить зелень в кастрюлю с супом. " +
          "Довести солянку до кипения, выключить нагрев " +
          "и дать настояться под крышкой 10 минут.",
        ingredients: [
          { recipeIngredientId: "solyanka-dill" },
          { recipeIngredientId: "solyanka-parsley" },
        ],
      },
      {
        id: "solyanka-step-11",
        description:
          "Разлить горячую солянку по тарелкам. " +
          "По желанию добавить в каждую порцию " +
          "по одной столовой ложке сметаны.",
        ingredients: [
          { recipeIngredientId: "solyanka-sour-cream" },
        ],
      },
    ],
  },


  {
    id: "cottage-cheese-casserole",
    title: "Нежная творожная запеканка без муки и манки",
    summary:
      "Воздушная творожная запеканка со сметаной, ванилином " +
      "и нежной однородной текстурой. Готовится без муки и манки.",
    image: "/images/recipes/cottage-cheese-casserole.jpg",
    imageAlt: "Творожная запеканка без муки и манки",
    cuisine: "Домашняя",
    baseServings: 8,
    cookingTimeMinutes: 60,

    ingredients: [
      {
        id: "casserole-cottage-cheese",
        ingredientId: "cottage-cheese",
        quantity: {
          type: "exact",
          amount: 720,
          unit: "g",
        },
      },
      {
        id: "casserole-sugar",
        ingredientId: "sugar",
        quantity: {
          type: "exact",
          amount: 150,
          unit: "g",
        },
      },
      {
        id: "casserole-eggs",
        ingredientId: "egg",
        quantity: {
          type: "exact",
          amount: 3,
          unit: "piece",
        },
      },
      {
        id: "casserole-starch",
        ingredientId: "starch",
        quantity: {
          type: "exact",
          amount: 4,
          unit: "tbsp",
        },
      },
      {
        id: "casserole-sour-cream",
        ingredientId: "sour-cream",
        quantity: {
          type: "exact",
          amount: 150,
          unit: "g",
        },
      },
      {
        id: "casserole-vanillin",
        ingredientId: "vanillin",
        quantity: {
          type: "exact",
          amount: 2,
          unit: "g",
        },
      },
      {
        id: "casserole-salt",
        ingredientId: "salt",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "pinch",
        },
      },
      {
        id: "casserole-lemon-zest",
        ingredientId: "lemon-zest",
        quantity: {
          type: "qualitative",
          value: "as-needed",
        },
      },
      {
        id: "casserole-orange-zest",
        ingredientId: "orange-zest",
        quantity: {
          type: "qualitative",
          value: "as-needed",
        },
      },
    ],

    steps: [
      {
        id: "casserole-step-1",
        description:
          "В глубокую миску выложить творог, сахар, яйца, " +
          "сметану, крахмал, ванилин и щепотку соли. " +
          "Творог и сметану можно использовать любой жирности.",
        ingredients: [
          { recipeIngredientId: "casserole-cottage-cheese" },
          { recipeIngredientId: "casserole-sugar" },
          { recipeIngredientId: "casserole-eggs" },
          { recipeIngredientId: "casserole-sour-cream" },
          { recipeIngredientId: "casserole-starch" },
          { recipeIngredientId: "casserole-vanillin" },
          { recipeIngredientId: "casserole-salt" },
        ],
      },
      {
        id: "casserole-step-2",
        description:
          "Пробить ингредиенты блендером до полностью " +
          "однородной, гладкой и блестящей массы без комочков.",
      },
      {
        id: "casserole-step-3",
        description:
          "По желанию добавить немного цедры лимона " +
          "или апельсина на выбор. Аккуратно перемешать " +
          "творожную массу до равномерного распределения цедры. " +
          "Этот этап можно пропустить.",
        ingredients: [
          { recipeIngredientId: "casserole-lemon-zest" },
          { recipeIngredientId: "casserole-orange-zest" },
        ],
      },
      {
        id: "casserole-step-4",
        description:
          "Переложить творожную массу в форму для выпечки. " +
          "Можно использовать кондитерское кольцо с " +
          "пергаментом на дне или обычную форму. " +
          "Равномерно распределить массу и разровнять поверхность.",
      },
      {
        id: "casserole-step-5",
        description:
          "Выпекать в духовке при температуре 180 °C " +
          "в течение 60 минут.",
      },
      {
        id: "casserole-step-6",
        description:
          "Достать готовую запеканку из духовки и дать ей " +
          "полностью остыть перед подачей.",
      },
    ],
  },

];

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}
```

# ./app/gallery/_components/FoodMap.module.css

```css

.section {
  margin-top: 40px;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.map {
  width: 100%;
  min-height: 480px;
  overflow: hidden;

  border: 1px solid #d8cfc5;
  border-radius: 12px;

  background: #eee5dc;
}

.sidebar {
  min-width: 0;
}

.sidebar h3 {
  margin-top: 0;
}

.placeList {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.placeButton {
  padding: 8px 12px;

  border: 1px solid #d8cfc5;
  border-radius: 8px;

  background: #ffffff;
  color: #8b4a2f;

  font: inherit;
  cursor: pointer;
}

.placeButton:hover {
  background: #f7eee7;
}

.placeButton[aria-pressed="true"] {
  background: #f0e3d9;
  border-color: #8b4a2f;
  font-weight: 700;
}

.details {
  padding: 16px;

  border: 1px solid #d8cfc5;
  border-radius: 12px;

  background: #faf5ef;
}

.details h3 {
  margin: 0 0 8px;
}

.details h4 {
  margin: 24px 0 10px;
}

.category {
  color: #8b4a2f;
  font-weight: 700;
}

.address {
  color: #665b52;
  font-size: 14px;
}

.mapLink {
  display: inline-block;
  color: #8b4a2f;
  font-weight: 700;
}

.recipeList {
  display: grid;
  gap: 10px;

  margin: 0;
  padding: 0;
  list-style: none;
}

.recipeButton {
  width: 100%;
  padding: 10px 12px;

  border: 1px solid #d8cfc5;
  border-radius: 8px;

  background: #ffffff;
  color: #8b4a2f;

  font: inherit;
  text-align: left;
  cursor: pointer;
}

.recipeButton:hover {
  background: #f0e3d9;
}

.status {
  padding: 12px 16px;
  border-radius: 8px;

  background: #fff0e5;
  color: #713b27;
}

.note {
  margin-bottom: 0;
  color: #665b52;
  font-size: 13px;
}

.placeButton:focus-visible,
.recipeButton:focus-visible,
.mapLink:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 3px;
}

@media (max-width: 720px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .map {
    min-height: 360px;
  }
}

.selectHint {
  margin: -8px 0 20px;

  color: #665b52;
  font-size: 13px;
  line-height: 1.5;
}
```

# ./app/gallery/_components/FoodMap.tsx

```tsx

"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import type { Recipe } from "../../data/recipes";
import {
  getYandexMapsUrl,
  type FoodPlace,
  type RecipePlace,
} from "../../data/foodPlaces";

import styles from "./FoodMap.module.css";

type Coordinates = [number, number];

type YandexPlacemark = {
  events: {
    add: (name: string, handler: () => void) => void;
  };

  options: {
    set: (options: {
      preset: string;
      iconColor: string;
    }) => void;
  };
};

type YandexMap = {
  geoObjects: {
    add: (placemark: YandexPlacemark) => void;
  };

  panTo: (
    center: Coordinates,
    options?: {
      duration?: number;
      flying?: boolean;
    },
  ) => void;

  destroy: () => void;
};

type YandexMapsApi = {
  ready: (
    callback: () => void,
    errorCallback?: (error: unknown) => void,
  ) => void;

  Map: new (
    container: HTMLElement,
    state: {
      center: Coordinates;
      zoom: number;
      controls: string[];
    },
  ) => YandexMap;

  Placemark: new (
    coordinates: Coordinates,
    properties: { hintContent: string },
    options: { preset: string; iconColor: string },
  ) => YandexPlacemark;
};

declare global {
  interface Window {
    ymaps?: YandexMapsApi;
  }
}

type FoodMapProps = {
  places: FoodPlace[];
  relations: RecipePlace[];
  recipes: Recipe[];
  onOpenRecipe: (
    recipe: Recipe,
    trigger: HTMLButtonElement,
  ) => void;
};

const categoryNames = {
  store: "Продуктовый магазин",
  restaurant: "Ресторан",
  scenic: "Место для отдыха",
} as const;

// Главный корпус ГУАП на Большой Морской, 67.
const GUAP_CENTER: Coordinates = [59.929561, 30.296671];

export default function FoodMap({
  places,
  relations,
  recipes,
  onOpenRecipe,
}: FoodMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Экземпляр карты.
  const mapRef = useRef<YandexMap | null>(null);

  // Словарь меток: идентификатор места -> метка Яндекса.
  const placemarkRefs = useRef<Map<string, YandexPlacemark>>(
    new Map(),
  );

  const [scriptReady, setScriptReady] = useState(false);
  const [mapStatus, setMapStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  const [selectedPlace, setSelectedPlace] =
    useState<FoodPlace | null>(places[0] ?? null);

  const apiKey =
    process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ?? "";

  // Создаём карту только после загрузки внешнего API.
  useEffect(() => {
    if (!apiKey || !scriptReady || !containerRef.current) {
      return;
    }

    const ymaps = window.ymaps;

    if (!ymaps) {
      return;
    }

    let disposed = false;
    let map: YandexMap | null = null;

    ymaps.ready(
      () => {
        if (disposed || !containerRef.current) {
          return;
        }

        try {
          map = new ymaps.Map(containerRef.current, {
            center: GUAP_CENTER,
            zoom: 15,
            controls: ["zoomControl"],
          });

          mapRef.current = map;
            placemarkRefs.current.clear();

          places.forEach((place) => {
            const placemark = new ymaps.Placemark(
              [place.latitude, place.longitude],
              {
                hintContent: place.name,
              },
              {
                preset: "islands#circleDotIcon",
                iconColor: "#8b4a2f",
              },
            );

            // Запоминаем метку для последующего изменения её вида.
              placemarkRefs.current.set(place.id, placemark);

            // Метка выбирает место, связанное с рецептами.
            placemark.events.add("click", () => {
              setSelectedPlace(place);
            });

            map?.geoObjects.add(placemark);
          });

          setMapStatus("ready");
        } catch {
          if (!disposed) {
            setMapStatus("error");
          }
        }
      },
      () => {
        if (!disposed) {
          setMapStatus("error");
        }
      },
    );

    // Очистка карты при уходе со страницы.
    return () => {
      disposed = true;

      placemarkRefs.current.clear();
      mapRef.current = null;

      map?.destroy();
    };
  }, [apiKey, scriptReady, places]);

  useEffect(() => {
    // Ждём, пока Яндекс Карты полностью инициализируются.
    if (mapStatus !== "ready" || !selectedPlace) {
      return;
    }

    const map = mapRef.current;

    if (!map) {
      return;
    }

    // Выделяем выбранную метку и возвращаем обычное
    // оформление всем остальным меткам.
    placemarkRefs.current.forEach((placemark, placeId) => {
      const isSelected = placeId === selectedPlace.id;

      placemark.options.set({
        preset: isSelected
          ? "islands#dotIcon"
          : "islands#circleDotIcon",

        iconColor: isSelected
          ? "#d35400"
          : "#8b4a2f",
      });
    });

    // Плавно перемещаем карту к выбранному месту.
    // Текущий масштаб пользователя не сбрасывается.
    void map.panTo(
      [selectedPlace.latitude, selectedPlace.longitude],
      {
        duration: 350,
        flying: false,
      },
    );
  }, [selectedPlace, mapStatus]);


  const relatedRecipeIds = new Set(
    relations
      .filter((relation) => relation.placeId === selectedPlace?.id)
      .map((relation) => relation.recipeId),
  );

  const relatedRecipes = recipes.filter((recipe) =>
    relatedRecipeIds.has(recipe.id),
  );

  return (
    <section className={styles.section} aria-labelledby="food-map-title">
      <h2 id="food-map-title">Места на карте</h2>

      <p>
        Магазины, заведения и места для отдыха, которые можно
        связать с рецептами. Демонстрационные точки расположены
        рядом с ГУАП в Санкт-Петербурге.
      </p>

      {!apiKey ? (
        <p className={styles.status} role="status">
          Не указан ключ Яндекс Карт.
          Проверьте NEXT_PUBLIC_YANDEX_MAPS_API_KEY в .env.local.
        </p>
      ) : (
        <>
          <Script
            src={`https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`}
            strategy="afterInteractive"
            onReady={() => setScriptReady(true)}
            onError={() => setMapStatus("error")}
          />

          {mapStatus === "loading" ? (
            <p className={styles.status} role="status">
              Карта загружается…
            </p>
          ) : null}

          {mapStatus === "error" ? (
            <p className={styles.status} role="alert">
              Не удалось загрузить карту.
              Можно воспользоваться ссылками на Яндекс Карты ниже.
            </p>
          ) : null}
        </>
      )}

      <div className={styles.layout}>
        <div
          ref={containerRef}
          className={styles.map}
          aria-label="Карта мест рядом с ГУАП"
        />

        <div className={styles.sidebar}>
          <h3>Выберите место</h3>

          <div className={styles.placeList}>
            {places.map((place) => (
              <button
                key={place.id}
                type="button"
                className={styles.placeButton}
                aria-pressed={selectedPlace?.id === place.id}
                onClick={() => setSelectedPlace(place)}
              >
                {place.name}
              </button>
            ))}
          </div>

          <p className={styles.selectHint}>
            Выберите место в списке или нажмите на метку на карте.
          </p>

          {selectedPlace ? (
            <div className={styles.details} aria-live="polite">
              <h3>{selectedPlace.name}</h3>

              <p className={styles.category}>
                {categoryNames[selectedPlace.category]}
              </p>

              <p>{selectedPlace.description}</p>

              <p className={styles.address}>
                {selectedPlace.address}
              </p>

              <a
                className={styles.mapLink}
                href={getYandexMapsUrl(selectedPlace)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть в Яндекс Картах ↗
              </a>

              <h4>Связанные рецепты</h4>

              {relatedRecipes.length > 0 ? (
                <ul className={styles.recipeList}>
                  {relatedRecipes.map((recipe) => (
                    <li key={recipe.id}>
                      <button
                        type="button"
                        className={styles.recipeButton}
                        onClick={(event) =>
                          onOpenRecipe(recipe, event.currentTarget)
                        }
                      >
                        {recipe.title}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Связанных рецептов пока нет.</p>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <p className={styles.note}>
        Связи с рецептами демонстрационные.
        Наличие конкретных продуктов и блюд не проверяется.
      </p>
    </section>
  );
}
```

# ./app/gallery/_components/RecipeModal.module.css

```css

.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;
  overflow-y: auto;

  background: rgb(30 24 20 / 72%);
}

.dialog {
  width: min(680px, 100%);
  max-height: calc(100dvh - 32px);
  overflow-y: auto;

  border: 1px solid #d8cfc5;
  border-radius: 16px;

  background: #ffffff;
  color: #2f2a25;

  box-shadow: 0 16px 50px rgb(0 0 0 / 25%);
}

.header {
  position: sticky;
  top: 0;
  z-index: 1;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  padding: 20px 24px;

  border-bottom: 1px solid #e4dcd3;
  background: #ffffff;
}

.header h2 {
  margin: 0;
  font-size: clamp(20px, 3vw, 26px);
  line-height: 1.3;
}

.closeButton {
  flex-shrink: 0;

  width: 38px;
  height: 38px;

  border: 1px solid #d8cfc5;
  border-radius: 8px;

  background: #faf5ef;
  color: #8b4a2f;

  font-size: 28px;
  line-height: 1;

  cursor: pointer;
}

.closeButton:hover {
  background: #f0e3d9;
}

.imageWrap {
  position: relative;

  width: calc(100% - 48px);
  aspect-ratio: 16 / 9;

  margin: 24px;
  overflow: hidden;

  border-radius: 12px;
  background: #eee5dc;
}

.image {
  object-fit: cover;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 20px;

  color: #665b52;
  text-align: center;
}

.content {
  padding: 0 24px 24px;
}

.content p {
  margin-top: 0;
}

.info {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px 20px;

  padding: 16px;
  margin: 20px 0;

  border-radius: 10px;
  background: #faf5ef;
}

.info dt {
  font-weight: 700;
}

.info dd {
  margin: 0;
  text-align: right;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.recipeLink {
  display: inline-block;
  padding: 12px 18px;

  border-radius: 8px;

  background: #8b4a2f;
  color: #ffffff;

  font-weight: 700;
  text-decoration: none;
}

.recipeLink:hover {
  background: #713b27;
}

.recipeLink:focus-visible,
.closeButton:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .overlay {
    padding: 8px;
  }

  .dialog {
    max-height: calc(100dvh - 16px);
  }

  .header {
    padding: 16px;
  }

  .imageWrap {
    width: calc(100% - 32px);
    margin: 16px;
  }

  .content {
    padding: 0 16px 16px;
  }
}

/* Будущая навигация между рецептами. */
.navigation {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  margin-bottom: 20px;
}

.navButton {
  min-height: 40px;
  padding: 8px 14px;

  border: 1px solid #d8cfc5;
  border-radius: 8px;

  background: #f7f3ed;
  color: #665b52;

  font: inherit;
}

.navButton:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Кнопка управления избранным. */
.favoriteButton {
  min-height: 44px;
  padding: 10px 16px;

  border: 1px solid #8b4a2f;
  border-radius: 8px;

  background: #ffffff;
  color: #8b4a2f;

  font: inherit;
  font-weight: 700;

  cursor: pointer;
}

.favoriteButton:hover {
  background: #f7eee7;
}

.favoriteButton[aria-pressed="true"] {
  background: #f0e3d9;
  color: #6f3824;
}

/* Ссылка на авторизацию для гостя. */
.loginLink {
  display: inline-flex;
  align-items: center;

  color: #8b4a2f;
  font-weight: 700;
  text-decoration: underline;
}

/* Примечание о временном хранении. */
.favoriteNote {
  margin-top: 16px !important;
  margin-bottom: 0;

  color: #665b52;
  font-size: 13px;
  line-height: 1.5;
}

/* Видимый фокус при работе с клавиатурой. */
.favoriteButton:focus-visible,
.loginLink:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 3px;
}
```

# ./app/gallery/_components/RecipeModal.tsx

```tsx

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
      returnFocusRef.current?.focus();
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
```

# ./app/gallery/_components/RecipesGallery.tsx

```tsx

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
```

# ./app/gallery/Gallery.module.css

```css
.grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 18px;
  margin-top: 24px;
}

.card {
  display: flex;
  flex-direction: column;

  min-width: 0;
  padding: 0;
  overflow: hidden;

  border: 1px solid #d8cfc5;
  border-radius: 12px;

  background: #ffffff;
  color: #2f2a25;

  font: inherit;
  text-align: left;

  cursor: pointer;

  box-shadow: 0 3px 12px rgb(47 42 37 / 8%);
}

.card:hover {
  border-color: #8b4a2f;
  background: #faf5ef;
}

.card:focus-visible,
.closeButton:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 3px;
}


.imageWrap {
  position: relative;

  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;

  background: #eee5dc;
}

.image {
  object-fit: cover;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 16px;

  color: #665b52;
  background: #eee5dc;

  font-size: 14px;
  text-align: center;
}

.cardContent {
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  padding: 18px;
}

.cardTitle {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
}

.description {
  font-size: 14px;
  line-height: 1.5;
}

.meta {
  margin-top: auto;
  padding-top: 8px;

  color: #8b4a2f;
  font-size: 13px;
  font-weight: 700;
}
/* Кнопка избранного */
.favoriteMark {
  display: inline-block;
  align-self: flex-start;

  padding: 5px 9px;

  border-radius: 6px;

  background: #f0e3d9;
  color: #8b4a2f;

  font-size: 13px;
  font-weight: 700;
}
```

# ./app/gallery/page.tsx

```tsx
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
```

# ./app/globals.css

```css
* {
  box-sizing: border-box;
}

html {
  background: #f7f3ed;
}

body {
  min-height: 100vh;
  margin: 0;

  color: #2f2a25;
  font-family: Arial, Helvetica, sans-serif;

  background-color: #f7f3ed;
  background-image: url("/patterns/pumpkin_background.svg");
  background-repeat: repeat;
  background-size: 120px 160px;
}

main {
  width: min(900px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0;
}

header,
section {
  margin-bottom: 32px;
}

h1 {
  margin: 0 0 16px;
  font-size: clamp(36px, 7vw, 64px);
}

h2 {
  margin-bottom: 16px;
}

p,
li {
  line-height: 1.6;
}

/* Выделяем основные смысловые блоки поверх фонового узора. */
main > section {
  padding: 24px;

  border: 1px solid #d8cfc5;
  border-radius: 14px;

  background: rgb(255 255 255 / 92%);
  box-shadow: 0 4px 18px rgb(47 42 37 / 6%);
}

.eyebrow {
  margin-bottom: 8px;
  color: #8b4a2f;
  font-weight: 700;
  text-transform: uppercase;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.feature-card {
  padding: 20px;

  border: 1px solid #d8cfc5;
  border-radius: 12px;

  background: rgb(255 255 255 / 94%);
  box-shadow: 0 3px 12px rgb(47 42 37 / 5%);
}

.feature-card h3 {
  margin-top: 0;
}

.main-link {
  display: inline-block;
  font-weight: 700;
  color: #8b4a2f;
}

.main-link:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 4px;
}

/* Оформление каталога рецептов. */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
  margin-top: 24px;
}

.card {
  padding: 22px;

  border: 1px solid #d8cfc5;
  border-radius: 12px;

  background: rgb(255 255 255 / 94%);
  box-shadow: 0 3px 12px rgb(47 42 37 / 5%);
}

.card h2 {
  margin-top: 0;
}

.card a {
  color: #8b4a2f;
  font-weight: 700;
}

.card a:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 4px;
}


/* Краткие сведения о рецепте. */
.recipe-info {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 8px 24px;
  max-width: 520px;
  margin: 0;
}

.recipe-info dt {
  font-weight: 700;
}

.recipe-info dd {
  margin: 0;
}


/* Основной список ингредиентов. */
.ingredient-list {
  width: 100%;
  max-width: 720px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ingredient-list li {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 10px 0;
  border-bottom: 1px solid #e4dcd3;
}

.ingredient-list strong {
  flex-shrink: 0;
}


/* Этапы приготовления. */
.recipe-steps {
  width: 100%;
  max-width: 720px;
  padding-left: 28px;
}

.recipe-steps > li {
  margin-bottom: 24px;
}

.recipe-steps > li > p {
  margin-bottom: 8px;
}

.step-ingredients {
  width: 100%;
  margin: 0;
  padding: 10px 16px 10px 32px;

  border-left: 3px solid #c98b62;

  background: #faf5ef;
}

.step-ingredients li {
  margin: 4px 0;
}


/* Небольшая адаптация узких окон. */
@media (max-width: 520px) {
  .recipe-info {
    grid-template-columns: 1fr;
    gap: 2px;
  }

  .recipe-info dd {
    margin-bottom: 12px;
  }

  .ingredient-list li {
    align-items: baseline;
  }
}

/* Общая навигация приложения. */
.site-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;

  min-height: 72px;
  padding: 12px 24px;

  border-bottom: 1px solid #d8cfc5;
  background: #ffffff;
  box-shadow: 0 2px 10px rgb(47 42 37 / 6%);
}

.brand {
  justify-self: start;

  color: #2f2a25;
  font-size: 22px;
  font-weight: 800;
  text-decoration: none;
}

.site-nav {
  justify-self: center;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.nav-link {
  display: inline-block;
  padding: 8px 10px;

  border-radius: 8px;

  color: #8b4a2f;
  text-decoration: none;
}

.nav-link:hover {
  background: #f7eee7;
}

.nav-link[aria-current="page"] {
  background: #f0e3d9;
  color: #6f3824;
  font-weight: 700;
}

.brand:focus-visible,
.nav-link:focus-visible,
.auth-area button:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 3px;
}

.auth-area {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 16px;
}

.auth-area button {
  padding: 8px 12px;

  border: 1px solid #8b4a2f;
  border-radius: 8px;

  background: #ffffff;
  color: #8b4a2f;

  font: inherit;
  font-weight: 700;

  cursor: pointer;
}

.auth-area button:hover {
  background: #f0e3d9;
}

/* Личный кабинет */
.auth-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.auth-summary a,
.login-link {
  color: #8b4a2f;
  font-weight: 700;
}

.auth-summary button,
.secondary-button {
  padding: 8px 12px;
  border: 1px solid #8b4a2f;
  border-radius: 8px;
  background: #ffffff;
  color: #8b4a2f;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.auth-summary button:hover,
.secondary-button:hover {
  background: #f0e3d9;
}

.login-link {
  margin-left: auto;
}

.profile-list {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px 20px;
  max-width: 520px;
  margin-bottom: 24px;
}

.profile-list dt {
  font-weight: 700;
}

.profile-list dd {
  margin: 0;
}
```

# ./app/layout.tsx

```tsx

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import BurgerMenu from "./ui/BurgerMenu/BurgerMenu";
import DemoAuthProvider from "./providers/DemoAuthProvider";

export const metadata: Metadata = {
  title: "Электронная книга рецептов",
  description: "Учебный проект на Next.js",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <DemoAuthProvider>
          <BurgerMenu />
          {children}
        </DemoAuthProvider>
      </body>
    </html>
  );
}
```

# ./app/page.tsx

```tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/start");
}
```

# ./app/providers/DemoAuthProvider.tsx

```tsx
// Хранит учебное состояние пользователя и предоставляет вход и выход через React Context.

"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Описываем данные учебного пользователя.
export type DemoUser = {
  name: string;
  email: string;
};
// Задаём контракт данных и функций контекста.
type DemoAuthContextValue = {
  user: DemoUser | null;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
};

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

export default function DemoAuthProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [user, setUser] = useState<DemoUser | null>(null);

  const value = useMemo<DemoAuthContextValue>(
    () => ({
      user,

      login(email) {
        const name = email.split("@")[0]?.trim() || "Пользователь";

        setUser({
          name,
          email,
        });
      },

      register(name, email) {
        setUser({
          name: name.trim(),
          email,
        });
      },

      logout() {
        setUser(null);
      },
    }),
    [user],
  );

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth(): DemoAuthContextValue {
  const context = useContext(DemoAuthContext);

  if (!context) {
    throw new Error(
      "useDemoAuth должен использоваться внутри DemoAuthProvider",
    );
  }

  return context;
}
```

# ./app/recipes/[id]/_components/RecipeDetails.module.css

```css
.sectionHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.sectionHeader h2 {
  margin-top: 0;
}

.servings {
  margin: -6px 0 16px;
  color: #665b52;
}

.resetButton {
  flex-shrink: 0;
  padding: 8px 12px;

  border: 1px solid #8b4a2f;
  border-radius: 8px;

  background: #ffffff;
  color: #8b4a2f;

  font: inherit;
  font-weight: 700;

  cursor: pointer;
}

.resetButton:hover {
  background: #f0e3d9;
}

.ingredientList {
  width: 100%;
  margin: 0;
  padding: 0;

  list-style: none;
}

.ingredientRow {
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto 42px;
  align-items: center;
  gap: 16px;

  min-height: 48px;
  padding: 8px 10px;

  border-bottom: 1px solid #e4dcd3;
  border-radius: 6px;
}

.changed {
  background: #f7e8da;
}

.quantity {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  min-width: 130px;
  text-align: right;
}

.changedLabel {
  margin-left: 6px;

  color: #8b4a2f;
  font-size: 12px;
  font-weight: 700;
}

.quantityInput {
  width: 90px;
  min-height: 36px;
  padding: 6px 8px;

  border: 1px solid #b9aea3;
  border-radius: 6px;

  background: #ffffff;
  color: #2f2a25;

  font: inherit;
  text-align: right;
}

.quantityInput:focus-visible,
.menuButton:focus-visible,
.actionMenu button:focus-visible,
.resetButton:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 2px;
}

.actions {
  position: relative;

  display: flex;
  justify-content: flex-end;
}

.menuButton {
  width: 36px;
  height: 36px;

  border: 1px solid transparent;
  border-radius: 8px;

  background: transparent;
  color: #8b4a2f;

  font-size: 22px;
  line-height: 1;

  cursor: pointer;
}

.menuButton:hover {
  border-color: #d8cfc5;
  background: #f7eee7;
}

.actionMenu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 10;

  display: grid;

  width: 230px;
  padding: 6px;

  border: 1px solid #d8cfc5;
  border-radius: 10px;

  background: #ffffff;
  box-shadow: 0 8px 24px rgb(47 42 37 / 14%);
}

.actionMenu button {
  padding: 9px 10px;

  border: 0;
  border-radius: 6px;

  background: transparent;
  color: #2f2a25;

  font: inherit;
  text-align: left;

  cursor: pointer;
}

.actionMenu button:hover {
  background: #f7eee7;
}

.editError {
  grid-column: 2 / 4;

  margin: 0;

  color: #9d2929;
  font-size: 13px;
  font-weight: 700;
  text-align: right;
}

.recipeSteps {
  width: 100%;
  margin-bottom: 0;
  padding-left: 28px;
}

.recipeSteps > li {
  margin-bottom: 24px;
}

.recipeSteps > li:last-child {
  margin-bottom: 0;
}

.recipeSteps > li > p {
  margin-bottom: 8px;
}

.stepIngredients {
  width: 100%;
  margin: 0;
  padding: 10px 16px 10px 32px;

  border-left: 3px solid #c98b62;

  background: #faf5ef;
}

.stepIngredients li {
  margin: 4px 0;
}

@media (max-width: 620px) {
  .sectionHeader {
    display: block;
  }

  .resetButton {
    margin-bottom: 16px;
  }

  .ingredientRow {
    grid-template-columns: minmax(0, 1fr) auto 42px;
    gap: 8px;
  }

  .quantity {
    min-width: 0;
  }

  .changedLabel {
    display: none;
  }
}
```

# ./app/recipes/[id]/_components/RecipeDetails.tsx

```tsx
// Реализует интерактивное отображение ингридиентов и этапов приготовлени,
// а также локальный пересчёт количества ингридиентов без повторного получения рецепта.
"use client";

import { useState } from "react";
import { getIngredient } from "../../../data/ingredients";
import type {
  IngredientQuantity,
  Recipe,
  RecipeIngredient,
} from "../../../data/recipes";
import styles from "./RecipeDetails.module.css";

// Описываем данные, которые серверная страница передаёт криентскому компоненту.
type RecipeDetailsProps = {
  recipe: Recipe;
};

// Определение двух режимов изменения количества:
// только выбранный ингридиент или пропорциональный пересчёт всего рецепта.
type RecalculationMode = "single" | "all";

// Хранение состояня редактированрия одного ингридиента
type EditingState = {
  ingredientId: string;
  mode: RecalculationMode;
  value: string;
  error: string;
};

// Сопоставление внутренних обозначений единиц измерения с текстом для интерфейса
const unitLabels = {
  g: "г",
  kg: "кг",
  ml: "мл",
  l: "л",
  tsp: "ч. л.",
  tbsp: "ст. л.",
  piece: "шт.",
  clove: "зубчик",
  pinch: "щепотка",
  slice: "ломтик",
} as const;

// Сопоставление ненормированного количества с понятными пользователю подписями
const qualitativeLabels = {
  "to-taste": "по вкусу",
  "as-needed": "по необходимости",
  "for-frying": "для жарки",
  "for-greasing": "для смазывания",
  "for-serving": "для подачи",
} as const;

// Получение отображаемого названия ингридиента из общего справачника
function getIngredientName(
  recipeIngredient: RecipeIngredient,
): string {
  return (
    getIngredient(recipeIngredient.ingredientId)?.name ??
    recipeIngredient.ingredientId
  );
}

// Форматирование количества порций:
// целые значения выводятся как число, а заметно дробные как диапазон.
function formatServings(value: number): string {
  const rounded = Math.round(value);

  if (Math.abs(value - rounded) < 0.05) {
    return String(rounded);
  }

  return `${Math.floor(value)}–${Math.ceil(value)}`;
}

// Форматирование количества с учётом единицы измерения
// В состоянии сохраняется точное число, округление применяется только при выводе
function formatAmount(
  value: number,
  unit: keyof typeof unitLabels,
): string {
  switch (unit) {
    case "g":
    case "ml":
    case "pinch":
      return String(Math.round(value));

    case "piece":
    case "clove":
    case "slice":
    case "tsp":
    case "tbsp":
      return Number(value.toFixed(1)).toString();

    case "kg":
    case "l":
      return Number(value.toFixed(2)).toString();

    default:
      return Number(value.toFixed(2)).toString();
  }
}

// Форматирование итоговой строки количества для точных,
// диапазонных и ненормированных ингридиентов
function formatQuantity(quantity: IngredientQuantity): string {
  if (quantity.type === "qualitative") {
    return qualitativeLabels[quantity.value];
  }

  const unit = unitLabels[quantity.unit];

  if (quantity.type === "range") {
    return `${formatAmount(
      quantity.min,
      quantity.unit,
    )}–${formatAmount(
      quantity.max,
      quantity.unit,
    )} ${unit}`;
  }

  return `${formatAmount(
    quantity.amount,
    quantity.unit,
  )} ${unit}`;
}

// Создание локальной копии исходных количеств ингридиентов.
// Используется для интерактивного пересчёта без изменения самого объекта recipe
function createInitialQuantities(
  recipe: Recipe,
): Record<string, IngredientQuantity> {
  return Object.fromEntries(
    recipe.ingredients.map((ingredient) => [
      ingredient.id,
      ingredient.quantity,
    ]),
  );
}

// Сравнение исходного и текущего количества, чтобы определить,
// изменялся ли пользователем ингридиент
function quantityChanged(
  original: IngredientQuantity,
  current: IngredientQuantity,
): boolean {
  if (original.type !== current.type) {
    return true;
  }

  if (
    original.type === "exact" &&
    current.type === "exact"
  ) {
    return original.amount !== current.amount;
  }

  if (
    original.type === "range" &&
    current.type === "range"
  ) {
    return (
      original.min !== current.min ||
      original.max !== current.max
    );
  }

  if (
    original.type === "qualitative" &&
    current.type === "qualitative"
  ) {
    return original.value !== current.value;
  }

  return false;
}

// Объявление клиентского компонента с интерактивным состоянием рецепта
export default function RecipeDetails({
  recipe,
}: RecipeDetailsProps) {
  // Хранение текущего кол-ва ингридиентов отдельно от исходных данных рецепта
  const [quantities, setQuantities] = useState<
    Record<string, IngredientQuantity>
  >(() => createInitialQuantities(recipe));

  // Хранение текущего расчётного коли-ва порций после пропорциональных изменений
  const [currentServings, setCurrentServings] =
    useState(recipe.baseServings);

  // Хранение id ингридиента, для которого открыто меню действий
  const [openMenuId, setOpenMenuId] =
    useState<string | null>(null);

  // Хранение данных текущего редактируемого количества
  const [editing, setEditing] =
    useState<EditingState | null>(null);

  // Проверка, отличается ли хотя бы одно текущее кол-во от исходного 
  // (для кнопки сброса)
  const hasChanges = recipe.ingredients.some((ingredient) =>
    quantityChanged(
      ingredient.quantity,
      quantities[ingredient.id] ?? ingredient.quantity,
    ),
  );

  // Перевод выбранного ингридиента в режим редактирования
  // запоминание выбранного способа пересчёта
  function startEditing(
    ingredient: RecipeIngredient,
    mode: RecalculationMode,
  ) {
    const quantity =
      quantities[ingredient.id] ?? ingredient.quantity;

    if (quantity.type !== "exact") {
      return;
    }

    setOpenMenuId(null);

    setEditing({
      ingredientId: ingredient.id,
      mode,
      value: String(quantity.amount),
      error: "",
    });
  }

  // Применения введённого количества
  // В режиме single изменяется только выбранный ингридиент,
  // а в режиме all вычисляется коэффициент и масштабируется весь рецепт
  function applyEditing() {
    if (!editing) {
      return;
    }

    const newAmount = Number(editing.value.replace(",", "."));

    // Не допускаются пустые, отрицательные и некорректные числовые значения
    if (!Number.isFinite(newAmount) || newAmount <= 0) {
      setEditing({
        ...editing,
        error: "Введите число больше нуля.",
      });
      return;
    }

    const ingredient = recipe.ingredients.find(
      (item) => item.id === editing.ingredientId,
    );

    if (!ingredient) {
      setEditing(null);
      return;
    }

    const currentQuantity =
      quantities[ingredient.id] ?? ingredient.quantity;

    if (currentQuantity.type !== "exact") {
      setEditing(null);
      return;
    }

    if (editing.mode === "single") {
      setQuantities((current) => ({
        ...current,
        [ingredient.id]: {
          ...currentQuantity,
          amount: newAmount,
        },
      }));

      setEditing(null);
      return;
    }

    // Вычилление коэффициента относительно текущего количества,
    // поэтому повторные пересчёты выполняются последовательно
    const factor = newAmount / currentQuantity.amount;

    setQuantities((current) => {
      const next = { ...current };

      // Масштавирование числовых и диапазонных количеств,
      // оставляя качественные значения вроде "по вкусу" без изменений
      for (const recipeIngredient of recipe.ingredients) {
        const quantity =
          current[recipeIngredient.id] ??
          recipeIngredient.quantity;

        if (quantity.type === "exact") {
          next[recipeIngredient.id] = {
            ...quantity,
            amount: quantity.amount * factor,
          };
        } else if (quantity.type === "range") {
          next[recipeIngredient.id] = {
            ...quantity,
            min: quantity.min * factor,
            max: quantity.max * factor,
          };
        }
      }

      return next;
    });

    // Порции изменяются тем же коэфициентом, что и остальной рецепт
    setCurrentServings((current) => current * factor);
    setEditing(null);
  }

  // Возвращение всех количеств порций и числа порций к базовым
  function resetChanges() {
    setQuantities(createInitialQuantities(recipe));
    setCurrentServings(recipe.baseServings);
    setEditing(null);
    setOpenMenuId(null);
  }

  // Пересчитывание кол-ва ингридиентов внутри внутри отдельного этапа,
  // пропорционально изменению его общего кол-ва в рецепте
  function getStepAmount(
    recipeIngredient: RecipeIngredient,
    baseAmount: number,
  ): number {
    if (recipeIngredient.quantity.type !== "exact") {
      return baseAmount;
    }

    // Сравнение текущего кол-ва с исходным и применяем тот же коэффициент к этапу
    const currentQuantity =
      quantities[recipeIngredient.id] ??
      recipeIngredient.quantity;

    if (currentQuantity.type !== "exact") {
      return baseAmount;
    }

    const factor =
      currentQuantity.amount /
      recipeIngredient.quantity.amount;

    return baseAmount * factor;
  }

  return (
    <>
      {/* Вывод интреактивного списка ингридиентов и управление пересчётом */}
      <section>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Ингредиенты</h2>

            <p className={styles.servings}>
              Текущее количество порций:{" "}
              <strong>{formatServings(currentServings)}</strong>
            </p>
          </div>

          {/* Отображение кнопки сброса только фактического изменения рецепта */}
          {hasChanges ? (
            <button
              className={styles.resetButton}
              type="button"
              onClick={resetChanges}
            >
              Сбросить изменения
            </button>
          ) : null}
        </div>

        <ul className={styles.ingredientList}>
          {/* Построение строки для каждого ингридиента из исходного массива рецепта */}
          {recipe.ingredients.map((ingredient) => {
            const quantity =
              quantities[ingredient.id] ??
              ingredient.quantity;

            const isChanged = quantityChanged(
              ingredient.quantity,
              quantity,
            );

            const isEditing =
              editing?.ingredientId === ingredient.id;

            const canRecalculate =
              quantity.type === "exact";

            return (
              <li
                className={
                  isChanged
                    ? `${styles.ingredientRow} ${styles.changed}`
                    : styles.ingredientRow
                }
                key={ingredient.id}
              >
                <span>
                  {getIngredientName(ingredient)}
                </span>

                <div className={styles.quantity}>
                  {isEditing &&
                  quantity.type === "exact" ? (
                    <>
                      <input
                        className={styles.quantityInput}
                        type="number"
                        min="0.01"
                        step="any"
                        value={editing.value}
                        aria-label={`Количество ингредиента ${getIngredientName(
                          ingredient,
                        )}`}
                        onChange={(event) => {
                          setEditing({
                            ...editing,
                            value: event.target.value,
                            error: "",
                          });
                        }}
                        // Сразу выделяется старое значение, чтобы новое число можно было ввести без удаления
                        onFocus={(event) => {
                          event.currentTarget.select();
                        }}
                        // Enter применяет изменение через потерю фокуса,
                        // Escape отменяет текущее редактирование
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            event.currentTarget.blur();
                          }

                          if (event.key === "Escape") {
                            setEditing(null);
                          }
                        }}
                        onBlur={applyEditing}
                        autoFocus
                      />

                      <span>
                        {unitLabels[quantity.unit]}
                      </span>
                    </>
                  ) : (
                    <strong>
                      {formatQuantity(quantity)}
                    </strong>
                  )}

                  {isChanged ? (
                    <span className={styles.changedLabel}>
                      изменено
                    </span>
                  ) : null}
                </div>

                <div className={styles.actions}>
                  {canRecalculate ? (
                    <>
                      {/* Меню позволяет локальное изменение или пересчёт всего рецепта */}
                      <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={`Изменить количество ингредиента ${getIngredientName(
                          ingredient,
                        )}`}
                        aria-expanded={
                          openMenuId === ingredient.id
                        }
                        onClick={() => {
                          setOpenMenuId((current) =>
                            current === ingredient.id
                              ? null
                              : ingredient.id,
                          );
                        }}
                      >
                        ⋯
                      </button>

                      {openMenuId === ingredient.id ? (
                        <div
                          className={styles.actionMenu}
                          role="menu"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() =>
                              startEditing(
                                ingredient,
                                "single",
                              )
                            }
                          >
                            Изменить только этот ингридиент
                          </button>

                          <button
                            type="button"
                            role="menuitem"
                            onClick={() =>
                              startEditing(
                                ingredient,
                                "all",
                              )
                            }
                          >
                            Пересчитать весь рецепт
                          </button>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>

                {isEditing && editing.error ? (
                  <p className={styles.editError}>
                    {editing.error}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Вывод этапов приготовления с количествами,
          синхранизированными с текущим состоянием ингридиентов  */}
      <section>
        <h2>Приготовление</h2>

        <ol className={styles.recipeSteps}>
          {recipe.steps.map((step) => (
            <li key={step.id}>
              <p>{step.description}</p>

              {step.ingredients &&
              step.ingredients.length > 0 ? (
                <ul className={styles.stepIngredients}>
                  {step.ingredients.map((usage) => {
                    // Нахождение основного ингридиента, на который ссылается текущий этап
                    const recipeIngredient =
                      recipe.ingredients.find(
                        (ingredient) =>
                          ingredient.id ===
                          usage.recipeIngredientId,
                      );

                    if (!recipeIngredient) {
                      return null;
                    }

                    return (
                      <li key={usage.recipeIngredientId}>
                        {getIngredientName(
                          recipeIngredient,
                        )}

                        {usage.amount !== undefined &&
                        recipeIngredient.quantity.type !==
                          "qualitative"
                          ? ` — ${formatAmount(
                                getStepAmount(recipeIngredient, usage.amount),
                                recipeIngredient.quantity.unit,
                              )} ${
                              unitLabels[
                                recipeIngredient.quantity
                                  .unit
                              ]
                            }`
                          : ""}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
```

# ./app/recipes/[id]/page.tsx

```tsx
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
```

# ./app/recipes/page.tsx

```tsx
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
```

# ./app/start/page.tsx

```tsx
import Link from "next/link";
import FeatureCard from "../ui/FeatureCard";

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

      <Link className="main-link" href="/recipes">
        Перейти к рецептам
      </Link>
    </main>
  );
}
```

# ./app/ui/AppNav.tsx

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoAuth } from "../providers/DemoAuthProvider";

const links = [
  { href: "/start", label: "Главная" },
  { href: "/recipes", label: "Рецепты" },
  { href: "/gallery", label: "Галерея" },
  { href: "/about", label: "О проекте" },
];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppNav() {
  const pathname = usePathname();
  const { user, logout } = useDemoAuth();

  return (
    <header className="site-header">
      <Link className="brand" href="/start">
        Электронная книга рецептов
      </Link>

      <nav className="site-nav" aria-label="Основная навигация">
        <ul className="nav-list">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="nav-link"
                href={link.href}
                aria-current={
                  isActive(pathname, link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="auth-area">
        {user ? (
          <>
            <Link
              className="nav-link"
              href="/account"
              aria-current={
                isActive(pathname, "/account") ? "page" : undefined
              }
            >
              {user.name}
            </Link>

            <button type="button" onClick={logout}>
              Выйти
            </button>
          </>
        ) : (
          <Link
            className="nav-link"
            href="/auth/login"
            aria-current={
              pathname.startsWith("/auth/") ? "page" : undefined
            }
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}
```

# ./app/ui/BurgerMenu/BurgerMenu.module.css

```css

/* Верхняя панель приложения. */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  min-height: 72px;
  margin-bottom: 0;
  padding: 12px 24px;

  border-bottom: 1px solid #d8cfc5;

  background: #ffffff;
  box-shadow: 0 2px 10px rgb(47 42 37 / 6%);
}

.brand {
  color: #2f2a25;
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 800;
  text-decoration: none;
}

/* Кнопка открытия меню. */
.menuButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  flex-shrink: 0;
  min-height: 44px;
  padding: 9px 16px;

  border: 1px solid #8b4a2f;
  border-radius: 8px;

  background: #ffffff;
  color: #8b4a2f;

  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.menuButton:hover {
  background: #f0e3d9;
}

.menuButton span:first-child {
  font-size: 22px;
  line-height: 1;
}

/* Затемнённый фон на весь экран. */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  justify-content: flex-end;

  background: rgb(30 24 20 / 65%);
}

/* Гарантируем, что закрытое меню не мешает странице. */
.overlay[hidden] {
  display: none;
}

/* Выдвижная панель справа. */
.panel {
  width: min(400px, 100%);
  height: 100dvh;
  overflow-y: auto;

  padding: 24px;

  background: #ffffff;
  color: #2f2a25;

  box-shadow: -8px 0 30px rgb(0 0 0 / 15%);
}

/* Заголовок и кнопка закрытия. */
.panelHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 28px;
}

.panelHeader h2 {
  margin: 0;
  font-size: 26px;
}

.closeButton {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;
  flex-shrink: 0;

  border: 1px solid #d8cfc5;
  border-radius: 8px;

  background: #faf5ef;
  color: #8b4a2f;

  font-size: 30px;
  cursor: pointer;
}

.closeButton:hover {
  background: #f0e3d9;
}

/* Основные пункты меню. */
.navigation {
  display: grid;
  gap: 8px;
}

.navLink {
  display: block;

  padding: 14px 16px;

  border-radius: 10px;

  color: #2f2a25;
  font-weight: 600;
  text-decoration: none;
}

.navLink:hover {
  background: #f7eee7;
}

.navLink[aria-current="page"],
.loginLink[aria-current="page"] {
  background: #f0e3d9;
  color: #6f3824;
  font-weight: 700;
}

/* Учётная запись. */
.accountArea {
  display: grid;
  gap: 14px;

  margin-top: 28px;
  padding-top: 24px;

  border-top: 1px solid #d8cfc5;
}

.userInfo {
  display: grid;
  gap: 6px;
  margin: 0;

  color: #665b52;
}

.userInfo strong {
  color: #2f2a25;
  overflow-wrap: anywhere;
}

.loginLink,
.logoutButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 44px;
  padding: 10px 16px;

  border: 1px solid #8b4a2f;
  border-radius: 8px;

  background: #8b4a2f;
  color: #ffffff;

  font: inherit;
  font-weight: 700;
  text-decoration: none;

  cursor: pointer;
}

.loginLink:hover,
.logoutButton:hover {
  background: #713b27;
}

/* Управление с клавиатуры. */
.brand:focus-visible,
.menuButton:focus-visible,
.closeButton:focus-visible,
.navLink:focus-visible,
.loginLink:focus-visible,
.logoutButton:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 3px;
}

/* Предварительная адаптация для узких экранов. */
@media (max-width: 480px) {
  .header {
    padding: 12px 16px;
  }

  .panel {
    padding: 20px 16px;
  }

  .menuButton {
    padding: 9px 12px;
  }
}
```

# ./app/ui/BurgerMenu/BurgerMenu.tsx

```tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { useDemoAuth } from "../../providers/DemoAuthProvider";
import styles from "./BurgerMenu.module.css";

// Основные маршруты приложения.
const links = [
  { href: "/start", label: "Главная" },
  { href: "/recipes", label: "Рецепты" },
  { href: "/gallery", label: "Галерея" },
  { href: "/about", label: "О проекте" },
  { href: "/account", label: "Личный кабинет" },
];

// Проверка активного маршрута.
function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BurgerMenu() {
  const pathname = usePathname();
  const { user, logout } = useDemoAuth();

  const [isOpen, setIsOpen] = useState(false);

  const panelId = useId();
  const titleId = useId();

  // Ссылки на элементы, участвующие в управлении фокусом.
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Запоминаем прежний режим прокрутки.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // При открытии фокус переходит на кнопку закрытия.
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      // Получаем доступные для клавиатуры элементы меню.
      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
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
        panelRef.current.focus();
        return;
      }

      const activeElement = document.activeElement;
      const focusOutside = !panelRef.current.contains(activeElement);

      // Зацикливаем фокус внутри открытой панели.
      if (
        event.shiftKey &&
        (activeElement === first || focusOutside)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === last || focusOutside)
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Восстанавливаем страницу при закрытии меню.
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen, closeMenu]);

  function handleLogout() {
    logout();
    closeMenu();
  }

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/start">
        Электронная книга рецептов
      </Link>

      <button
        ref={triggerRef}
        className={styles.menuButton}
        type="button"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span aria-hidden="true">☰</span>
        <span>Меню</span>
      </button>

      {/* Фон и панель меню. */}
      <div
        id={panelId}
        className={styles.overlay}
        hidden={!isOpen}
        onClick={(event) => {
          // Нажатие внутри панели не должно закрывать её.
          if (event.target === event.currentTarget) {
            closeMenu();
          }
        }}
      >
        <div
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
        >
          <div className={styles.panelHeader}>
            <h2 id={titleId}>Навигация</h2>

            <button
              ref={closeButtonRef}
              className={styles.closeButton}
              type="button"
              aria-label="Закрыть меню"
              onClick={closeMenu}
            >
              ×
            </button>
          </div>

          <nav
            className={styles.navigation}
            aria-label="Основная навигация"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                className={styles.navLink}
                href={link.href}
                aria-current={
                  isActive(pathname, link.href)
                    ? "page"
                    : undefined
                }
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.accountArea}>
            {user ? (
              <>
                <p className={styles.userInfo}>
                  Вы вошли как
                  <strong>{user.name}</strong>
                </p>

                <button
                  className={styles.logoutButton}
                  type="button"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link
                className={styles.loginLink}
                href="/auth/login"
                aria-current={
                  pathname.startsWith("/auth/")
                    ? "page"
                    : undefined
                }
                onClick={closeMenu}
              >
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
```

# ./app/ui/FeatureCard.tsx

```tsx
type FeatureCardProps = Readonly<{
  title: string;
  description: string;
}>;

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
```

# ./app/validation/auth.ts

```typescript
export const PASSWORD_MIN_LENGTH = 8;

export function validateName(name: string): string | null {
  if (!name.trim()) {
    return "Введите имя.";
  }

  return null;
}

export function validateEmail(email: string): string | null {
  const value = email.trim();

  if (!value) {
    return "Введите email.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    return "Введите корректный email.";
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Введите пароль.";
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Пароль должен содержать не менее ${PASSWORD_MIN_LENGTH} символов.`;
  }

  return null;
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string,
): string | null {
  if (!confirmation) {
    return "Повторите пароль.";
  }

  if (password !== confirmation) {
    return "Введённые пароли не совпадают.";
  }

  return null;
}
```
