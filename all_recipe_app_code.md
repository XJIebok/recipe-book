# Recipe App: снимок исходного кода

Создан: 2026-11-09 00:00

Включены исходники приложения, конфигурация, Prisma, миграции, seed и скрипты.
Исключены .env-файлы, node_modules, .next, lock-файлы и бинарные данные.

## Структура проекта (отобранные файлы)

- `.gitignore`
- `README.md`
- `app/about/page.tsx`
- `app/account/page.tsx`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/auth/me/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/favorites/[recipeId]/route.ts`
- `app/auth/Auth.module.css`
- `app/auth/login/page.tsx`
- `app/auth/register/page.tsx`
- `app/data/foodPlaces.ts`
- `app/data/ingredients.ts`
- `app/data/recipes.ts`
- `app/gallery/Gallery.module.css`
- `app/gallery/_components/FoodMap.module.css`
- `app/gallery/_components/FoodMap.tsx`
- `app/gallery/_components/RecipeModal.module.css`
- `app/gallery/_components/RecipeModal.tsx`
- `app/gallery/_components/RecipesGallery.tsx`
- `app/gallery/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `app/lib/auth.ts`
- `app/lib/current-user.ts`
- `app/lib/prisma.ts`
- `app/lib/recipe-import/normalize.ts`
- `app/lib/recipe-import/save-recipe.ts`
- `app/lib/recipe-import/units.ts`
- `app/lib/recipe-import/validation.ts`
- `app/lib/validation.ts`
- `app/page.tsx`
- `app/providers/DemoAuthProvider.tsx`
- `app/recipes/[id]/_components/RecipeDetails.module.css`
- `app/recipes/[id]/_components/RecipeDetails.tsx`
- `app/recipes/[id]/page.tsx`
- `app/recipes/page.tsx`
- `app/start/page.tsx`
- `app/ui/BurgerMenu/BurgerMenu.module.css`
- `app/ui/BurgerMenu/BurgerMenu.tsx`
- `app/ui/FeatureCard.tsx`
- `app/validation/auth.ts`
- `eslint.config.mjs`
- `md_merge_next.py`
- `next.config.ts`
- `package.json`
- `prisma/migrations/20261106203335_init_recipe_book/migration.sql`
- `prisma/migrations/20261107165432_add_integrity_constraints/migration.sql`
- `prisma/migrations/migration_lock.toml`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `scripts/check-db.sql`
- `scripts/check-prisma.ts`
- `scripts/check-recipe-import.ts`
- `scripts/import-recipe-json.ts`
- `tsconfig.json`

## Файлы в public/ (только пути, без содержимого)

- `public/file.svg`
- `public/globe.svg`
- `public/images/recipes/cottage-cheese-casserole.jpg`
- `public/images/recipes/pancakes.jpg`
- `public/images/recipes/solyanka.jpg`
- `public/next.svg`
- `public/patterns/pumpkin_background.svg`
- `public/vercel.svg`
- `public/window.svg`

## Переменные из .env.example (только названия)

- `AUTH_SECRET`
- `DATABASE_URL`
- `SEED_DEMO_PASSWORD`
- `SHADOW_DATABASE_URL`

## Содержимое исходников

### ./.gitignore

```text
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*
!.env.example

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

/app/generated/prisma
```

### ./README.md

````markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
````

### ./app/about/page.tsx

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

### ./app/account/page.tsx

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

### ./app/api/auth/login/route.ts

```typescript

import { compare } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/app/lib/prisma";
import { createSession } from "@/app/lib/auth";
import { normalizeEmail } from "@/app/lib/validation";

export const runtime = "nodejs";

// Проверяем входные данные запроса.
const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { errors: ["Некорректный JSON."] },
      { status: 400 },
    );
  }

  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { errors: ["Введите корректные email и пароль."] },
      { status: 400 },
    );
  }

  const email = normalizeEmail(validation.data.email);
  const password = validation.data.password;

  try {
    // Ищем существующего пользователя.
    const account = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
      },
    });

    // Сравниваем введённый пароль с bcrypt-хешем.
    if (
      !account ||
      !(await compare(password, account.passwordHash))
    ) {
      return NextResponse.json(
        { errors: ["Неверный email или пароль."] },
        { status: 401 },
      );
    }

    // Создаём сессию после успешного входа.
    await createSession({
      userId: account.id,
      name: account.name,
    });

    // Возвращаем только безопасные поля.
    return NextResponse.json({
      user: {
        id: account.id,
        name: account.name,
        email: account.email,
      },
    });
  } catch {
    return NextResponse.json(
      { errors: ["Внутренняя ошибка сервера."] },
      { status: 500 },
    );
  }
}
```

### ./app/api/auth/logout/route.ts

```typescript

import { NextResponse } from "next/server";
import { deleteSession } from "@/app/lib/auth";

export const runtime = "nodejs";

// Завершаем пользовательскую сессию.
export async function POST() {
  await deleteSession();

  return NextResponse.json(
  { message: "Выход выполнен успешно." },
  {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  },);
}
```

### ./app/api/auth/me/route.ts

```typescript

import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/lib/current-user";

export const runtime = "nodejs";

// Возвращаем текущего пользователя или null.
export async function GET() {
  try {
    const user = await getCurrentUser();

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json(
      { errors: ["Внутренняя ошибка сервера."] },
      { status: 500 },
    );
  }
}
```

### ./app/api/auth/register/route.ts

```typescript

import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { createSession } from "@/app/lib/auth";
import { validateRegistration } from "@/app/lib/validation";

export const runtime = "nodejs";

// Обрабатываем POST-запрос регистрации.
export async function POST(request: Request) {
  // 1. Читаем JSON из запроса.
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { errors: ["Некорректный JSON."] },
      { status: 400 },
    );
  }

  // 2. Проверяем данные через Zod.
  const validation = validateRegistration(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        errors: validation.error.issues.map(
          (issue) => issue.message,
        ),
      },
      { status: 400 },
    );
  }

  // Данные прошли проверку и нормализацию.
  const { name, email, password } = validation.data;

  try {
    // 3. Хешируем пароль перед сохранением.
    const passwordHash = await hash(password, 12);

    // 4. Создаём пользователя в PostgreSQL.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // 5. Создаём серверную сессию.
    await createSession({
      userId: user.id,
      name: user.name,
    });

    // 6. Возвращаем успешный ответ.
    return NextResponse.json(
      { user },
      { status: 201 },
    );
  } catch (error) {
    // Email уже зарегистрирован.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { errors: ["Этот email уже зарегистрирован."] },
        { status: 409 },
      );
    }

    // Не раскрываем внутренние ошибки сервера.
    return NextResponse.json(
      { errors: ["Внутренняя ошибка сервера."] },
      { status: 500 },
    );
  }
}
```

### ./app/api/favorites/[recipeId]/route.ts

```typescript

import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/current-user";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ recipeId: string }>;
};

export async function POST(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    // 1. Проверяем, кто отправил запрос.
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { errors: ["Необходима авторизация."] },
        { status: 401 },
      );
    }

    // 2. Получаем ID рецепта из адреса.
    const { recipeId: rawId } = await params;
    const recipeId = Number(rawId);

    if (
      !/^[1-9]\d*$/.test(rawId) ||
      !Number.isSafeInteger(recipeId)
    ) {
      return NextResponse.json(
        { errors: ["Некорректный ID рецепта."] },
        { status: 400 },
      );
    }

    // 3. Убеждаемся, что рецепт существует.
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { id: true },
    });

    if (!recipe) {
      return NextResponse.json(
        { errors: ["Рецепт не найден."] },
        { status: 404 },
      );
    }

    // 4. Проверяем, был ли рецепт уже избранным.
    const key = {
      userId: user.id,
      recipeId,
    };

    const existing = await prisma.favoriteRecipe.findUnique({
      where: { userId_recipeId: key },
    });

    // 5. Создаём связь или оставляем существующую.
    await prisma.favoriteRecipe.upsert({
      where: { userId_recipeId: key },
      update: {},
      create: key,
    });

    return NextResponse.json(
      { recipeId, isFavorite: true },
      { status: existing ? 200 : 201 },
    );
  } catch {
    return NextResponse.json(
      { errors: ["Внутренняя ошибка сервера."] },
      { status: 500 },
    );
  }
}


export async function DELETE(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    // 1. Проверяем авторизацию.
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { errors: ["Необходима авторизация."] },
        { status: 401 },
      );
    }

    // 2. Получаем и проверяем ID рецепта.
    const { recipeId: rawId } = await params;
    const recipeId = Number(rawId);

    if (
      !/^[1-9]\d*$/.test(rawId) ||
      !Number.isSafeInteger(recipeId)
    ) {
      return NextResponse.json(
        { errors: ["Некорректный ID рецепта."] },
        { status: 400 },
      );
    }

    // 3. Удаляем связь только текущего пользователя.
    const result = await prisma.favoriteRecipe.deleteMany({
      where: {
        userId: user.id,
        recipeId,
      },
    });

    // 4. Возвращаем результат.
    return NextResponse.json({
      recipeId,
      isFavorite: false,
      deleted: result.count > 0,
    });
  } catch {
    return NextResponse.json(
      { errors: ["Внутренняя ошибка сервера."] },
      { status: 500 },
    );
  }
}
```

### ./app/auth/Auth.module.css

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

### ./app/auth/login/page.tsx

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

### ./app/auth/register/page.tsx

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

### ./app/data/foodPlaces.ts

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

### ./app/data/ingredients.ts

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

### ./app/data/recipes.ts

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

### ./app/gallery/Gallery.module.css

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

@media (hover: hover) and (pointer: fine) {
  .card:hover {
    border-color: #8b4a2f;
    background: #faf5ef;
  }
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

### ./app/gallery/_components/FoodMap.module.css

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

@media (hover: hover) and (pointer: fine) {
  .placeButton:hover {
    background: #f7eee7;
  }
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

@media (hover: hover) and (pointer: fine) {
  .recipeButton:hover {
    background: #f0e3d9;
  }
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
    grid-template-columns: minmax(0, 1fr);
  }

  .map {
    min-height: 360px;
  }
}

/* На телефоне карта занимает ширину секции почти до её границ. */
@media (max-width: 480px) {
  .section {
    margin-top: 24px;
  }

  .layout {
    gap: 16px;
    margin-top: 16px;
  }

  .map {
   width: calc(100% + 28px);
    margin-inline: -14px;
    min-height: 320px;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
  }

  .details {
    padding: 12px;
  }
}


.selectHint {
  margin: -8px 0 20px;

  color: #665b52;
  font-size: 13px;
  line-height: 1.5;
}
```

### ./app/gallery/_components/FoodMap.tsx

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
  container: {
    fitToViewport: () => void;
  };
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
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [mapStatus, setMapStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  const [selectedPlace, setSelectedPlace] =
    useState<FoodPlace | null>(places[0] ?? null);

  const apiKey =
    process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ?? "";

  // До появления карты рядом с областью просмотра не загружаем тяжёлый API.
  useEffect(() => {
    const container = containerRef.current;
    if (!apiKey || !container || shouldLoadMap) {
      return;
    }

    // Резервный вариант для браузера без IntersectionObserver.
    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setShouldLoadMap(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [apiKey, shouldLoadMap]);

  // Создаём карту только после загрузки внешнего API.
  useEffect(() => {
    if (!apiKey || !scriptReady || !containerRef.current) {
      return;
    }

    const ymaps = window.ymaps;

    if (!ymaps) {
      return;
    }

    // Сохраняем ссылку на коллекцию меток для очистки.
    const placemarks = placemarkRefs.current;

    let disposed = false;
    let map: YandexMap | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let resizeFrame: number | null = null;

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

          // После изменения размеров контейнера сообщаем карте новую ширину.
          if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(() => {
              if (resizeFrame !== null) {
                cancelAnimationFrame(resizeFrame);
              }

              resizeFrame = requestAnimationFrame(() => {
                if (!disposed) {
                  map?.container.fitToViewport();
                }
                resizeFrame = null;
              });
            });
            resizeObserver.observe(containerRef.current);
          }

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

      // Отключаем наблюдение за размерами контейнера.
      resizeObserver?.disconnect();

      // Отменяем запланированный пересчёт размеров.
      if (resizeFrame !== null) {
        cancelAnimationFrame(resizeFrame);
      }

      // Очищаем метки и освобождаем карту.
      placemarks.clear();
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
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : 350,
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
          {shouldLoadMap ? (
            <Script
              src={`https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`}
              strategy="afterInteractive"
              onReady={() => setScriptReady(true)}
              onError={() => setMapStatus("error")}
            />
          ) : (
            <p className={styles.status} role="status">
              Карта загрузится при прокрутке к этому разделу.
            </p>
          )}

          {shouldLoadMap && mapStatus === "loading" ? (
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
          role="region"
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

### ./app/gallery/_components/RecipeModal.module.css

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

@media (hover: hover) and (pointer: fine) {
  .closeButton:hover {
    background: #f0e3d9;
  }
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

@media (hover: hover) and (pointer: fine) {
  .recipeLink:hover {
    background: #713b27;
  }
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

@media (hover: hover) and (pointer: fine) {
  .favoriteButton:hover {
    background: #f7eee7;
  }
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

### ./app/gallery/_components/RecipeModal.tsx

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
              sizes="(max-width: 480px) calc(100vw - 48px), (max-width: 720px) calc(100vw - 80px), 632px"
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>
              Фото рецепта пока отсутствует
            </div>
          )}
        </div>

        <div className={styles.content}>
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

### ./app/gallery/_components/RecipesGallery.tsx

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
                  sizes="(max-width: 530px) calc(100vw - 24px), (max-width: 790px) calc(50vw - 24px), 300px"
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
```

### ./app/gallery/page.tsx

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

### ./app/globals.css

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

  background: rgb(255 255 255 / 70%);
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

  background: rgb(255 255 255 / 70%);
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

  background: rgb(255 255 255 / 70%);
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

/* Кнопка выхода в личном кабинете. */
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

.secondary-button:hover {
  background: #f0e3d9;
}

.secondary-button:focus-visible {
  outline: 3px solid #8b4a2f;
  outline-offset: 3px;
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

/* ЛР4: более компактная раскладка на узком экране. */
@media (max-width: 480px) {
  main {
    width: calc(100% - 24px);
    padding-block: 24px;
  }

  h1 {
    font-size: clamp(28px, 8vw, 36px);
  }

  main > section {
    padding: 14px;
    margin-bottom: 20px;
  }

  main > header {
    margin-bottom: 24px;
  }
}

/* Уважаем системную настройку уменьшения движения. */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Убираем стандартную подсветку касания,
   сохраняя видимый фокус при работе с клавиатурой. */
a,
button {
  -webkit-tap-highlight-color: transparent;
}
```

### ./app/layout.tsx

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

### ./app/lib/auth.ts

```typescript

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Имя cookie, в которой хранится сессия.
const COOKIE_NAME = "recipe_session";

// Срок действия: 7 дней в секундах.
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

// Получаем секрет из переменных окружения.
function getSecret(): Uint8Array {
  const value = process.env.AUTH_SECRET;

  if (!value) {
    throw new Error("AUTH_SECRET is not configured");
  }

  return new TextEncoder().encode(value);
}

// Данные, которые разрешено хранить в JWT.
export type SessionPayload = {
  userId: string;
  name: string;
};

// Создаём подписанный JWT.
async function signSession(
  payload: SessionPayload,
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

// Создаём сессию и устанавливаем cookie.
export async function createSession(
  payload: SessionPayload,
): Promise<void> {
  const token = await signSession(payload);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

// Читаем и проверяем существующую сессию.
export async function readSession():
  Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      getSecret(),
      { algorithms: ["HS256"] },
    );

    if (
      typeof payload.userId !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      name: payload.name,
    };
  } catch {
    // Неверная подпись или истёк срок действия.
    return null;
  }
}

// Удаляем cookie при выходе пользователя.
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
```

### ./app/lib/current-user.ts

```typescript

import { prisma } from "./prisma";
import { readSession } from "./auth";

// Получаем текущего пользователя по серверной сессии.
export async function getCurrentUser() {
  // Проверяем JWT и извлекаем данные сессии.
  const session = await readSession();

  if (!session) {
    return null;
  }

  // Проверяем существование пользователя в PostgreSQL.
  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
}
```

### ./app/lib/prisma.ts

```typescript

import { PrismaClient } from "@prisma/client";

// Храним единый экземпляр PrismaClient.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Повторно используем клиент при горячей перезагрузке Next.js.
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

```

### ./app/lib/recipe-import/normalize.ts

```typescript
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
```

### ./app/lib/recipe-import/save-recipe.ts

```typescript
import { randomUUID } from "node:crypto";
import { Prisma, type Cuisine } from "@prisma/client";
import { prisma } from "../prisma";
import {
  parseRecipeImport,
  type RecipeImportIngredient,
  type RecipeImportInput,
} from "./validation";

// Используется только сервером и локальными scripts, НЕ клиентским React-кодом.
// Для будущего публичного API необходима отдельная проверка сессии и прав.
export type SaveRecipeOptions =
  | { mode?: "create"; allowCreateIngredients?: boolean }
  | { mode: "replace-seeded"; seedSlug: string; allowCreateIngredients?: boolean };

function normalizedQuantity(ingredient: RecipeImportIngredient): {
  unitCode: string;
  amount: string | null;
  maxAmount: string | null;
} {
  const quantity = ingredient.quantity;
  if (quantity.type === "qualitative") {
    return { unitCode: quantity.value, amount: null, maxAmount: null };
  }
  if (quantity.type === "range") {
    return {
      unitCode: quantity.unit,
      amount: quantity.min.toFixed(3),
      maxAmount: quantity.max.toFixed(3),
    };
  }
  return {
    unitCode: quantity.unit,
    amount: quantity.amount.toFixed(3),
    maxAmount: null,
  };
}

/**
 * Используем уникальный индекс с NULLS NOT DISTINCT из нашей SQL-миграции.
 * Prisma Schema не умеет описывать его как обычный @@unique.
 *
 * INSERT ... ON CONFLICT DO NOTHING безопасен при параллельном импорте и не
 * обновляет общую/неизменяемую IngredientMeasurement. SQL параметризован.
 */
async function getOrCreateMeasurement(
  tx: Prisma.TransactionClient,
  ingredientId: string,
  unitCode: string,
  amount: string | null,
  maxAmount: string | null,
): Promise<number> {
  const inserted = await tx.$queryRaw<Array<{ id: number }>>`
    INSERT INTO "IngredientMeasurement"
      ("ingredientId", "unitCode", "amount", "maxAmount")
    VALUES (
      ${ingredientId}, ${unitCode},
      ${amount}::numeric, ${maxAmount}::numeric
    )
    ON CONFLICT ("ingredientId", "unitCode", "amount", "maxAmount")
    DO NOTHING
    RETURNING "id"
  `;

  if (inserted.length > 0) return inserted[0].id;

  // После завершённого конфликта в READ COMMITTED запись доступна на новом запросе.
  const found = await tx.ingredientMeasurement.findFirst({
    where: { ingredientId, unitCode, amount, maxAmount },
    select: { id: true },
  });
  if (!found) {
    throw new Error(`Не удалось получить общую запись количества ${ingredientId}/${unitCode}`);
  }
  return found.id;
}

/**
 * Атомарное создание рецепта из проверенного JSON-представления.
 * Режим replace-seeded разрешён ТОЛЬКО для собственных рецептов seed:
 * сохраняет ID Recipe и избранное, но полностью пересоздаёт шаги/состав.
 * Для пользовательского импорта используется mode=create (по умолчанию).
 */
export async function saveRecipe(
  rawInput: unknown,
  options: SaveRecipeOptions = {},
): Promise<{ id: number; slug: string }> {
  const input: RecipeImportInput = parseRecipeImport(rawInput);
  const isSeed = options.mode === "replace-seeded";
  const slug = isSeed ? options.seedSlug : `recipe-${randomUUID()}`;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100) {
    throw new Error(`Некорректный slug: ${slug}`);
  }

  return prisma.$transaction(async (tx) => {
    const requiredUnits = new Set(input.ingredients.map((item) => normalizedQuantity(item).unitCode));
    for (const code of requiredUnits) {
      const existingUnit = await tx.measurementUnit.findUnique({ where: { code } });
      if (!existingUnit) {
        throw new Error(`Единица ${code} отсутствует в MeasurementUnit. Сначала запустите seed справочников.`);
      }
    }

    for (const item of input.ingredients) {
      const found = await tx.ingredient.findUnique({ where: { id: item.ingredientId } });
      if (!found) {
        if (!options.allowCreateIngredients || !item.ingredientName) {
          throw new Error(
            `Ингредиент ${item.ingredientId} не найден. ` +
            "Сопоставьте его со справочником или разрешите создание нового с ingredientName.",
          );
        }
        // Не обновляем уже существующее название данными из внешнего JSON.
        await tx.ingredient.upsert({
          where: { id: item.ingredientId },
          update: {},
          create: { id: item.ingredientId, name: item.ingredientName },
        });
      }
    }

    const recipeData = {
      title: input.title,
      summary: input.summary,
      cuisine: (input.cuisine ?? null) as Cuisine | null,
      baseServings: input.baseServings,
      cookingTimeMinutes: input.cookingTimeMinutes,
      image: input.image ?? null,
      imageAlt: input.imageAlt ?? null,
      videoUrl: input.videoUrl ?? null,
    };

    const recipe = isSeed
      ? await tx.recipe.upsert({
          where: { slug },
          create: { slug, ...recipeData },
          update: recipeData,
        })
      : await tx.recipe.create({ data: { slug, ...recipeData } });

    if (isSeed) {
      // Записи FavoriteRecipe не трогаем, а Recipe.id сохраняется.
      // При удалении шагов связанные StepIngredientUsage удаляются CASCADE.
      await tx.recipeStep.deleteMany({ where: { recipeId: recipe.id } });
      await tx.recipeIngredient.deleteMany({ where: { recipeId: recipe.id } });
    }

    const ingredientIds = new Map<string, number>();
    for (const item of input.ingredients) {
      const normalized = normalizedQuantity(item);
      const measurementId = await getOrCreateMeasurement(
        tx, item.ingredientId, normalized.unitCode,
        normalized.amount, normalized.maxAmount,
      );
      const association = await tx.recipeIngredient.create({
        data: { recipeId: recipe.id, measurementId },
        select: { id: true },
      });
      ingredientIds.set(item.key, association.id);
    }

    for (const [index, step] of input.steps.entries()) {
      const createdStep = await tx.recipeStep.create({
        data: {
          recipeId: recipe.id,
          position: index + 1,
          description: step.description,
          image: step.image ?? null,
          imageAlt: step.imageAlt ?? null,
          durationMinutes: step.durationMinutes ?? null,
        },
        select: { id: true },
      });

      for (const usage of step.ingredients ?? []) {
        const recipeIngredientId = ingredientIds.get(usage.ingredientKey);
        if (recipeIngredientId === undefined) {
          // Подстраховка: schema уже проверяет этот случай до транзакции.
          throw new Error(`Не найден ingredientKey: ${usage.ingredientKey}`);
        }
        await tx.stepIngredientUsage.create({
          data: {
            recipeId: recipe.id,
            stepId: createdStep.id,
            recipeIngredientId,
            fraction: usage.fraction == null ? null : usage.fraction.toFixed(6),
          },
        });
      }
    }
    return { id: recipe.id, slug: recipe.slug };
  }, { timeout: 20_000 });
}
```

### ./app/lib/recipe-import/units.ts

```typescript
// Единый справочник обозначений количеств для Prisma и импорта JSON.
// Коды совпадают с app/data/recipes.ts и RecipeDetails.tsx.
export const NUMERIC_UNITS = [
  "g",
  "kg",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "piece",
  "clove",
  "pinch",
  "slice",
] as const;

export const QUALITATIVE_UNITS = [
  "to-taste",
  "as-needed",
  "for-frying",
  "for-greasing",
  "for-serving",
] as const;

export const MEASUREMENT_UNITS = [
  { code: "g", name: "г", kind: "NUMERIC" },
  { code: "kg", name: "кг", kind: "NUMERIC" },
  { code: "ml", name: "мл", kind: "NUMERIC" },
  { code: "l", name: "л", kind: "NUMERIC" },
  { code: "tsp", name: "ч. л.", kind: "NUMERIC" },
  { code: "tbsp", name: "ст. л.", kind: "NUMERIC" },
  { code: "piece", name: "шт.", kind: "NUMERIC" },
  { code: "clove", name: "зубчик", kind: "NUMERIC" },
  { code: "pinch", name: "щепотка", kind: "NUMERIC" },
  { code: "slice", name: "ломтик", kind: "NUMERIC" },
  { code: "to-taste", name: "по вкусу", kind: "QUALITATIVE" },
  { code: "as-needed", name: "по необходимости", kind: "QUALITATIVE" },
  { code: "for-frying", name: "для жарки", kind: "QUALITATIVE" },
  { code: "for-greasing", name: "для смазывания", kind: "QUALITATIVE" },
  { code: "for-serving", name: "для подачи", kind: "QUALITATIVE" },
] as const;
```

### ./app/lib/recipe-import/validation.ts

```typescript
import { z } from "zod";
import { NUMERIC_UNITS, QUALITATIVE_UNITS } from "./units";

// PostgreSQL DECIMAL(12,3) хранит не более 9 цифр перед точкой
// и 3 цифр после. Не округляем внешние данные молча.
const DECIMAL_MAX = 999_999_999.999;
const fitsScale = (value: number, digits: number): boolean => {
  const factor = 10 ** digits;
  return Math.abs(value - Math.round(value * factor) / factor) < 1e-10;
};

const dbAmount = z.number().finite().positive().max(DECIMAL_MAX).refine(
  (value) => fitsScale(value, 3),
  "Допускается не более 3 знаков после запятой",
);

const fraction = z.number().finite().gt(0).lte(1).refine(
  (value) => fitsScale(value, 6) && Math.round(value * 1_000_000) > 0,
  "Доля должна помещаться в DECIMAL(8,6)",
);

const exactQuantity = z.object({
  type: z.literal("exact"),
  amount: dbAmount,
  unit: z.enum(NUMERIC_UNITS),
}).strict();

const rangeQuantity = z.object({
  type: z.literal("range"),
  min: dbAmount,
  max: dbAmount,
  unit: z.enum(NUMERIC_UNITS),
}).strict().refine((quantity) => quantity.max > quantity.min, {
  message: "Верхняя граница диапазона должна быть больше нижней",
  path: ["max"],
});

const qualitativeQuantity = z.object({
  type: z.literal("qualitative"),
  value: z.enum(QUALITATIVE_UNITS),
}).strict();

const quantitySchema = z.union([
  exactQuantity,
  rangeQuantity,
  qualitativeQuantity,
]);

const localKey = z.string().trim().min(1).max(100).regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Используйте строчные латинские буквы, цифры и дефисы",
);

const optionalText = (max: number) => z.string().trim().max(max).nullable().optional();

const recipeIngredientSchema = z.object({
  // Локальный ключ в JSON. Не является ID в PostgreSQL.
  key: localKey,
  ingredientId: localKey,
  // Используется лишь если новый ингредиент разрешено создать.
  ingredientName: z.string().trim().min(1).max(150).optional(),
  quantity: quantitySchema,
}).strict();

const stepUsageSchema = z.object({
  ingredientKey: localKey,
  // Отсутствие fraction означает «используется без указания расхода».
  fraction: fraction.nullable().optional(),
}).strict();

const recipeStepSchema = z.object({
  description: z.string().trim().min(1).max(10_000),
  image: optionalText(2048),
  imageAlt: optionalText(1000),
  durationMinutes: z.number().int().nonnegative().nullable().optional(),
  ingredients: z.array(stepUsageSchema).optional(),
}).strict();

export const recipeImportSchema = z.object({
  formatVersion: z.literal(1),
  title: z.string().trim().min(2).max(200),
  summary: z.string().trim().min(1).max(10_000),
  cuisine: z.enum(["ITALIAN", "RUSSIAN", "HOME_STYLE"]).nullable().optional(),
  baseServings: z.number().int().positive(),
  cookingTimeMinutes: z.number().int().nonnegative(),
  image: optionalText(2048),
  imageAlt: optionalText(1000),
  videoUrl: optionalText(2048),
  ingredients: z.array(recipeIngredientSchema).min(1).max(500),
  steps: z.array(recipeStepSchema).min(1).max(500),
}).strict().superRefine((recipe, context) => {
  const byKey = new Map(recipe.ingredients.map((item) => [item.key, item]));
  const seenKeys = new Set<string>();
  const seenMeasurements = new Set<string>();

  recipe.ingredients.forEach((item, index) => {
    if (seenKeys.has(item.key)) {
      context.addIssue({
        code: "custom", path: ["ingredients", index, "key"],
        message: `Повторяется локальный ключ ингредиента: ${item.key}`,
      });
    }
    seenKeys.add(item.key);

    // RecipeIngredient в БД уникален по (recipeId, measurementId).
    const q = item.quantity;
    const signature = q.type === "qualitative"
      ? `${item.ingredientId}|${q.value}|null|null`
      : q.type === "exact"
        ? `${item.ingredientId}|${q.unit}|${q.amount.toFixed(3)}|null`
        : `${item.ingredientId}|${q.unit}|${q.min.toFixed(3)}|${q.max.toFixed(3)}`;
    if (seenMeasurements.has(signature)) {
      context.addIssue({
        code: "custom", path: ["ingredients", index],
        message: "Дублируется одинаковое количество одного ингредиента в рецепте",
      });
    }
    seenMeasurements.add(signature);
  });

  recipe.steps.forEach((step, stepIndex) => {
    const usedKeys = new Set<string>();
    (step.ingredients ?? []).forEach((usage, usageIndex) => {
      const path = ["steps", stepIndex, "ingredients", usageIndex];
      const ingredient = byKey.get(usage.ingredientKey);
      if (!ingredient) {
        context.addIssue({
          code: "custom", path: [...path, "ingredientKey"],
          message: `Ингредиент с ключом ${usage.ingredientKey} не найден в этом рецепте`,
        });
      }
      if (usedKeys.has(usage.ingredientKey)) {
        context.addIssue({
          code: "custom", path: [...path, "ingredientKey"],
          message: "Ингредиент дважды указан в одном шаге",
        });
      }
      usedKeys.add(usage.ingredientKey);
      if (ingredient?.quantity.type === "qualitative" && usage.fraction != null) {
        context.addIssue({
          code: "custom", path: [...path, "fraction"],
          message: "Для качественного количества долю не задаём",
        });
      }
    });
  });
});

export type RecipeImportInput = z.infer<typeof recipeImportSchema>;
export type RecipeImportIngredient = RecipeImportInput["ingredients"][number];

export function parseRecipeImport(data: unknown): RecipeImportInput {
  return recipeImportSchema.parse(data);
}
```

### ./app/lib/validation.ts

```typescript

import { z } from "zod";

// Приводим email к единому виду.
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Описываем допустимые данные регистрации.
const registrationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Имя должно содержать минимум 2 символа.")
      .max(80, "Имя не должно превышать 80 символов."),

    email: z
      .string()
      .transform(normalizeEmail)
      .pipe(
        z
          .string()
          .max(254, "Email слишком длинный.")
          .email("Некорректный email."),
      ),

    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов."),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Пароли не совпадают.",
      path: ["confirmPassword"],
    },
  );

// Проверяем данные, не доверяя их типу.
export function validateRegistration(input: unknown) {
  return registrationSchema.safeParse(input);
}
```

### ./app/page.tsx

```tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/start");
}
```

### ./app/providers/DemoAuthProvider.tsx

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

### ./app/recipes/[id]/_components/RecipeDetails.module.css

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

@media (hover: hover) and (pointer: fine) {
  .resetButton:hover {
    background: #f0e3d9;
  }
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

@media (hover: hover) and (pointer: fine) {
  .menuButton:hover {
    border-color: #d8cfc5;
    background: #f7eee7;
  }
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

@media (hover: hover) and (pointer: fine) {
  .actionMenu button:hover {
    background: #f7eee7;
  }
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

### ./app/recipes/[id]/_components/RecipeDetails.tsx

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

### ./app/recipes/[id]/page.tsx

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

### ./app/recipes/page.tsx

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

### ./app/start/page.tsx

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

### ./app/ui/BurgerMenu/BurgerMenu.module.css

```css

/* Верхняя панель приложения. */
.header {
  /* Остаётся у верхнего края при прокрутке и плавно прячется вниз. */
  position: sticky;
  top: 0;
  z-index: 100;
  transition: top 200ms ease;

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

/* Скрываем шапку выше видимой области, не используя transform.
   Иначе fixed-оверлей вложенного меню может потерять привязку к viewport. */
.headerHidden {
  top: -120px;
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

@media (hover: hover) and (pointer: fine) {
  .menuButton:hover {
    background: #f0e3d9;
  }
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
  width: min(400px, 90vw);
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

@media (hover: hover) and (pointer: fine) {
  .closeButton:hover {
    background: #f0e3d9;
  }
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

@media (hover: hover) and (pointer: fine) {
  .navLink:hover {
    background: #f7eee7;
  }
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

@media (hover: hover) and (pointer: fine) {
  .loginLink:hover,
  .logoutButton:hover {
    background: #713b27;
  }
}

/* Кнопка возврата наверх появляется при обратной прокрутке. */
.backToTop {
  position: fixed;
  right: calc(16px + env(safe-area-inset-right, 0px));
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: 90;

  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;

  border: 0;
  border-radius: 50%;
  background: #8b4a2f;
  color: #ffffff;
  box-shadow: 0 4px 16px rgb(47 42 37 / 25%);

  font: inherit;
  font-size: 28px;
  cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {
  .backToTop:hover {
    background: #713b27;
  }
}

/* Управление с клавиатуры. */
.brand:focus-visible,
.menuButton:focus-visible,
.closeButton:focus-visible,
.navLink:focus-visible,
.loginLink:focus-visible,
.logoutButton:focus-visible,
.backToTop:focus-visible {
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

@media (prefers-reduced-motion: reduce) {
  .header {
    transition: none;
  }
}
```

### ./app/ui/BurgerMenu/BurgerMenu.tsx

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
  const [showHeader, setShowHeader] = useState(true);
  const [pastScrollThreshold, setPastScrollThreshold] = useState(false);

  const panelId = useId();
  const titleId = useId();

  // Ссылки на элементы, участвующие в управлении фокусом.
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
 
  // Показываем шапку при движении вверх, скрываем при движении вниз.
  useEffect(() => {
    let lastDirectionY = window.scrollY;

    function handleScroll() {
      const y = Math.max(0, window.scrollY);
      setPastScrollThreshold(y > 400);

      // Рядом с началом страницы шапка всегда видима.
      if (y <= 120) {
        setShowHeader(true);
        lastDirectionY = y;
        return;
      }

      const delta = y - lastDirectionY;
      if (Math.abs(delta) >= 8) {
        setShowHeader(delta < 0);
        lastDirectionY = y;
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }


  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Запоминаем кнопку, открывшую меню.
    const triggerButton = triggerRef.current;

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
      triggerButton?.focus();
    };
  }, [isOpen, closeMenu]);

  function handleLogout() {
    logout();
    closeMenu();
  }

  return (
    <>
    <header
      className={`${styles.header} ${!showHeader && !isOpen ? styles.headerHidden : ""}`}
    >
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
    {pastScrollThreshold && showHeader && !isOpen ? (
      <button
        type="button"
        className={styles.backToTop}
        aria-label="Вернуться к началу страницы"
        title="Наверх"
        onClick={scrollToTop}
      >
        <span aria-hidden="true">↑</span>
      </button>
    ) : null}
    </>
  );
}
```

### ./app/ui/FeatureCard.tsx

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

### ./app/validation/auth.ts

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

### ./eslint.config.mjs

```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### ./md_merge_next.py

````python
from pathlib import Path
from datetime import datetime

# Скрипт рассчитан на то, что этот файл лежит в корне Next.js-проекта,
# рядом с package.json и папкой app.
PROJECT_DIR = Path(__file__).resolve().parent
APP_DIR = PROJECT_DIR / "app"

# Какие файлы из app добавлять в итоговый Markdown.
LANGUAGES = {
    ".tsx": "tsx",
    ".ts": "typescript",
    ".css": "css",
}

OUTPUT_FILENAME = "all_recipe_app_code.md"
OUTPUT_PATH = PROJECT_DIR / OUTPUT_FILENAME


def merge_app_files() -> None:
    if not APP_DIR.exists():
        print(
            f"Ошибка: папка '{APP_DIR}' не найдена.\n"
            "Положите этот скрипт в корень Next.js-проекта рядом с папкой app."
        )
        return

    files = sorted(
        path
        for path in APP_DIR.rglob("*")
        if path.is_file() and path.suffix.lower() in LANGUAGES
    )

    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M")

    with OUTPUT_PATH.open("w", encoding="utf-8") as outfile:
        outfile.write("# Recipe App Code Snapshot\n\n")
        outfile.write(f"Generated: {generated_at}\n\n")
        outfile.write(f"Files: {len(files)}\n")

        for file_path in files:
            relative_path = file_path.relative_to(PROJECT_DIR).as_posix()
            language = LANGUAGES[file_path.suffix.lower()]

            outfile.write(f"\n# ./{relative_path}\n\n")
            outfile.write(f"```{language}\n")

            try:
                content = file_path.read_text(encoding="utf-8", errors="ignore")
                outfile.write(content)

                # Чтобы закрывающие ``` всегда начинались с новой строки.
                if content and not content.endswith("\n"):
                    outfile.write("\n")
            except Exception as exc:
                outfile.write(f"// Ошибка чтения файла: {exc}\n")

            outfile.write("```\n")

    print(f"Готово. Собрано файлов: {len(files)}")
    print(f"Итоговый файл: {OUTPUT_PATH}")


if __name__ == "__main__":
    merge_app_files()
````

### ./next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### ./package.json

```json
{
  "name": "recipe-book",
  "version": "0.1.0",
  "private": true,
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@prisma/client": "^6.19.2",
    "bcrypt": "^6.0.0",
    "dotenv": "^18.0.9",
    "jose": "^6.2.15",
    "next": "16.3.4",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.4",
    "prisma": "^6.19.2",
    "tsx": "^4.23.15",
    "typescript": "^5"
  }
}
```

### ./prisma/migrations/20261106203335_init_recipe_book/migration.sql

```sql
-- CreateEnum
CREATE TYPE "Cuisine" AS ENUM ('ITALIAN', 'RUSSIAN', 'HOME_STYLE');

-- CreateEnum
CREATE TYPE "UnitKind" AS ENUM ('NUMERIC', 'QUALITATIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "summary" TEXT NOT NULL,
    "cuisine" "Cuisine",
    "baseServings" INTEGER NOT NULL,
    "cookingTimeMinutes" INTEGER NOT NULL,
    "image" TEXT,
    "imageAlt" TEXT,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasurementUnit" (
    "code" VARCHAR(32) NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "kind" "UnitKind" NOT NULL,

    CONSTRAINT "MeasurementUnit_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "IngredientMeasurement" (
    "id" SERIAL NOT NULL,
    "ingredientId" VARCHAR(100) NOT NULL,
    "unitCode" VARCHAR(32) NOT NULL,
    "amount" DECIMAL(12,3),
    "maxAmount" DECIMAL(12,3),

    CONSTRAINT "IngredientMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "measurementId" INTEGER NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeStep" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "imageAlt" TEXT,
    "durationMinutes" INTEGER,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepIngredientUsage" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,
    "recipeIngredientId" INTEGER NOT NULL,
    "fraction" DECIMAL(8,6),

    CONSTRAINT "StepIngredientUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteRecipe" (
    "userId" UUID NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteRecipe_pkey" PRIMARY KEY ("userId","recipeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");

-- CreateIndex
CREATE INDEX "Recipe_cuisine_cookingTimeMinutes_idx" ON "Recipe"("cuisine", "cookingTimeMinutes");

-- CreateIndex
CREATE INDEX "Recipe_cookingTimeMinutes_idx" ON "Recipe"("cookingTimeMinutes");

-- CreateIndex
CREATE INDEX "Recipe_title_idx" ON "Recipe"("title");

-- CreateIndex
CREATE INDEX "RecipeIngredient_measurementId_recipeId_idx" ON "RecipeIngredient"("measurementId", "recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_measurementId_key" ON "RecipeIngredient"("recipeId", "measurementId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_id_recipeId_key" ON "RecipeIngredient"("id", "recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStep_recipeId_position_key" ON "RecipeStep"("recipeId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStep_id_recipeId_key" ON "RecipeStep"("id", "recipeId");

-- CreateIndex
CREATE INDEX "StepIngredientUsage_recipeIngredientId_recipeId_idx" ON "StepIngredientUsage"("recipeIngredientId", "recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "StepIngredientUsage_stepId_recipeIngredientId_key" ON "StepIngredientUsage"("stepId", "recipeIngredientId");

-- CreateIndex
CREATE INDEX "FavoriteRecipe_recipeId_idx" ON "FavoriteRecipe"("recipeId");

-- AddForeignKey
ALTER TABLE "IngredientMeasurement" ADD CONSTRAINT "IngredientMeasurement_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientMeasurement" ADD CONSTRAINT "IngredientMeasurement_unitCode_fkey" FOREIGN KEY ("unitCode") REFERENCES "MeasurementUnit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "IngredientMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStep" ADD CONSTRAINT "RecipeStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepIngredientUsage" ADD CONSTRAINT "StepIngredientUsage_stepId_recipeId_fkey" FOREIGN KEY ("stepId", "recipeId") REFERENCES "RecipeStep"("id", "recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepIngredientUsage" ADD CONSTRAINT "StepIngredientUsage_recipeIngredientId_recipeId_fkey" FOREIGN KEY ("recipeIngredientId", "recipeId") REFERENCES "RecipeIngredient"("id", "recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### ./prisma/migrations/20261107165432_add_integrity_constraints/migration.sql

```sql
-- Дополнение к первоначальной миграции ЛР6.
-- Выполняется ПОСЛЕ CREATE TABLE, CREATE INDEX и ADD FOREIGN KEY.
-- Предназначено для PostgreSQL 18 и Prisma ORM 6.19.2.

-- 1. Проверки обычных скалярных значений.
ALTER TABLE "Recipe"
    ADD CONSTRAINT "Recipe_baseServings_positive_chk"
        CHECK ("baseServings" > 0),
    ADD CONSTRAINT "Recipe_cookingTime_nonnegative_chk"
        CHECK ("cookingTimeMinutes" >= 0);

ALTER TABLE "RecipeStep"
    ADD CONSTRAINT "RecipeStep_position_positive_chk"
        CHECK ("position" > 0),
    ADD CONSTRAINT "RecipeStep_duration_nonnegative_chk"
        CHECK ("durationMinutes" IS NULL OR "durationMinutes" >= 0);

ALTER TABLE "StepIngredientUsage"
    ADD CONSTRAINT "StepIngredientUsage_fraction_range_chk"
        CHECK ("fraction" IS NULL OR ("fraction" > 0 AND "fraction" <= 1));

-- 2. Согласованность двух числовых полей независимо от вида единицы.
-- Допустимы: NULL + NULL, положительное число + NULL,
-- положительный минимум + строго больший максимум.
ALTER TABLE "IngredientMeasurement"
    ADD CONSTRAINT "IngredientMeasurement_amount_shape_chk"
        CHECK (
            ("amount" IS NULL AND "maxAmount" IS NULL)
            OR
            (
                "amount" IS NOT NULL
                AND "amount" > 0
                AND (
                    "maxAmount" IS NULL
                    OR "maxAmount" > "amount"
                )
            )
        );

-- 3. Одинаковые сочетания не дублируем, даже при NULL в полях количества.
-- Индекс также подходит для поиска вариантов одного ингредиента.
CREATE UNIQUE INDEX "IngredientMeasurement_combination_unique_idx"
    ON "IngredientMeasurement" ("ingredientId", "unitCode", "amount", "maxAmount")
    NULLS NOT DISTINCT;

-- 4. Триггер проверяет, соответствует ли указанной единице форма количества.
-- NUMERIC: положительное количество (точное или диапазон).
-- QUALITATIVE: оба числовых поля должны быть NULL.
CREATE FUNCTION "check_ingredient_measurement_kind"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    actual_kind "UnitKind";
BEGIN
    -- FOR SHARE не даст параллельно изменить kind, пока создаётся запись.
    SELECT "kind"
      INTO actual_kind
      FROM "MeasurementUnit"
     WHERE "code" = NEW."unitCode"
     FOR SHARE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Неизвестная единица измерения: %', NEW."unitCode"
            USING ERRCODE = '23503';
    END IF;

    IF actual_kind = 'QUALITATIVE' THEN
        IF NEW."amount" IS NOT NULL OR NEW."maxAmount" IS NOT NULL THEN
            RAISE EXCEPTION 'Для качественной единицы % числа должны быть NULL', NEW."unitCode"
                USING ERRCODE = '23514';
        END IF;
    ELSIF actual_kind = 'NUMERIC' THEN
        IF NEW."amount" IS NULL THEN
            RAISE EXCEPTION 'Для числовой единицы % необходимо положительное amount', NEW."unitCode"
                USING ERRCODE = '23514';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER "IngredientMeasurement_check_kind_trg"
    BEFORE INSERT OR UPDATE OF "unitCode", "amount", "maxAmount"
    ON "IngredientMeasurement"
    FOR EACH ROW
    EXECUTE FUNCTION "check_ingredient_measurement_kind"();

-- 5. Не разрешаем менять kind справочника, если он уже используется.
CREATE FUNCTION "prevent_used_unit_kind_change"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF OLD."kind" IS DISTINCT FROM NEW."kind"
        AND EXISTS (
            SELECT 1
              FROM "IngredientMeasurement"
             WHERE "unitCode" = OLD."code"
        ) THEN
        RAISE EXCEPTION 'Нельзя менять вид (%) используемой единицы %', OLD."kind", OLD."code"
            USING ERRCODE = '23514';
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER "MeasurementUnit_prevent_kind_change_trg"
    BEFORE UPDATE OF "kind"
    ON "MeasurementUnit"
    FOR EACH ROW
    EXECUTE FUNCTION "prevent_used_unit_kind_change"();

-- 6. Переиспользуемые IngredientMeasurement считаются неизменяемыми.
-- При редактировании рецепта следует найти или создать новую комбинацию,
-- а затем поменять ссылку RecipeIngredient.measurementId.
CREATE FUNCTION "prevent_measurement_rewrite"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF ROW(NEW."id", NEW."ingredientId", NEW."unitCode", NEW."amount", NEW."maxAmount")
       IS DISTINCT FROM
       ROW(OLD."id", OLD."ingredientId", OLD."unitCode", OLD."amount", OLD."maxAmount") THEN
        RAISE EXCEPTION 'IngredientMeasurement неизменяема: создайте новую комбинацию'
            USING ERRCODE = '23514';
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER "IngredientMeasurement_prevent_rewrite_trg"
    BEFORE UPDATE
    ON "IngredientMeasurement"
    FOR EACH ROW
    EXECUTE FUNCTION "prevent_measurement_rewrite"();
```

### ./prisma/migrations/migration_lock.toml

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"
```

### ./prisma/schema.prisma

```prisma
// ЛР6. Электронная книга рецептов.
// Совместимо с Prisma ORM 6.19.2. Пока только модель: миграция ещё не применялась.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}

enum Cuisine {
  ITALIAN
  RUSSIAN
  HOME_STYLE
}

enum UnitKind {
  NUMERIC
  QUALITATIVE
}

model User {
  id           String   @id @default(uuid()) @db.Uuid
  name         String   @db.VarChar(80)
  email        String   @unique @db.VarChar(254)
  passwordHash String   @db.VarChar(255)
  createdAt    DateTime @default(now()) @db.Timestamptz(3)
  updatedAt    DateTime @updatedAt @db.Timestamptz(3)

  favorites FavoriteRecipe[]
}

model Recipe {
  id                 Int      @id @default(autoincrement())
  slug               String   @unique @db.VarChar(100)
  title              String   @db.VarChar(200)
  summary            String   @db.Text
  cuisine            Cuisine?
  baseServings       Int
  cookingTimeMinutes Int
  image              String?  @db.Text
  imageAlt           String?  @db.Text
  videoUrl           String?  @db.Text
  createdAt          DateTime @default(now()) @db.Timestamptz(3)
  updatedAt          DateTime @updatedAt @db.Timestamptz(3)

  ingredients RecipeIngredient[]
  steps       RecipeStep[]
  favorites   FavoriteRecipe[]

  // Быстрые фильтры по кухне и времени, сортировка по времени и названию.
  @@index([cuisine, cookingTimeMinutes])
  @@index([cookingTimeMinutes])
  @@index([title])
}

model Ingredient {
  id   String @id @db.VarChar(100)
  name String @db.VarChar(150)

  measurements IngredientMeasurement[]
}

model MeasurementUnit {
  code String   @id @db.VarChar(32)
  name String   @db.VarChar(60)
  kind UnitKind

  measurements IngredientMeasurement[]
}

model IngredientMeasurement {
  id           Int      @id @default(autoincrement())
  ingredientId String   @db.VarChar(100)
  unitCode     String   @db.VarChar(32)
  amount       Decimal? @db.Decimal(12, 3)
  maxAmount    Decimal? @db.Decimal(12, 3)

  ingredient Ingredient         @relation(fields: [ingredientId], references: [id], onDelete: Restrict)
  unit       MeasurementUnit    @relation(fields: [unitCode], references: [code], onDelete: Restrict)
  recipes    RecipeIngredient[]

  // Уникальность сочетаний, включая NULL, добавим в SQL-миграцию:
  // UNIQUE INDEX (... ingredientId, unitCode, amount, maxAmount) NULLS NOT DISTINCT.
  // Этот индекс одновременно поможет искать все количества заданного ингредиента.
}

model RecipeIngredient {
  id            Int @id @default(autoincrement())
  recipeId      Int
  measurementId Int

  recipe      Recipe                @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  measurement IngredientMeasurement @relation(fields: [measurementId], references: [id], onDelete: Restrict)
  usages      StepIngredientUsage[]

  // Одну и ту же запись о количестве не добавляем дважды в один рецепт.
  @@unique([recipeId, measurementId])
  // Для FK из StepIngredientUsage: контроль принадлежности одному рецепту.
  @@unique([id, recipeId])
  // Обратный поиск рецептов по варианту количества ингредиента.
  @@index([measurementId, recipeId])
}

model RecipeStep {
  id              Int     @id @default(autoincrement())
  recipeId        Int
  position        Int
  description     String  @db.Text
  image           String? @db.Text
  imageAlt        String? @db.Text
  durationMinutes Int?

  recipe Recipe                @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  usages StepIngredientUsage[]

  @@unique([recipeId, position])
  // Для FK из StepIngredientUsage: контроль принадлежности одному рецепту.
  @@unique([id, recipeId])
}

model StepIngredientUsage {
  id                 Int      @id @default(autoincrement())
  recipeId           Int
  stepId             Int
  recipeIngredientId Int
  fraction           Decimal? @db.Decimal(8, 6)

  // Два составных FK не позволяют указать ингредиент чужого рецепта.
  step             RecipeStep       @relation(fields: [stepId, recipeId], references: [id, recipeId], onDelete: Cascade)
  recipeIngredient RecipeIngredient @relation(fields: [recipeIngredientId, recipeId], references: [id, recipeId], onDelete: Cascade)

  @@unique([stepId, recipeIngredientId])
  @@index([recipeIngredientId, recipeId])
}

model FavoriteRecipe {
  userId    String   @db.Uuid
  recipeId  Int
  createdAt DateTime @default(now()) @db.Timestamptz(3)

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  // Методичка ЛР6 требует составной первичный ключ у избранного.
  @@id([userId, recipeId])
  @@index([recipeId])
}
```

### ./prisma/seed.ts

```typescript
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
```

### ./scripts/check-db.sql

```sql
-- для применения запроса sql использовать:
-- \i 'E:/Documents/сем 7/Web-программирование/Лаба 1/recipe-book/scripts/check-db.sql'
```

### ./scripts/check-prisma.ts

```typescript

import "dotenv/config";
import { prisma } from "../app/lib/prisma";

type ConnectionInfo = {
  database: string;
  role: string;
  port: number;
};

async function main() {
  const rows = await prisma.$queryRaw<ConnectionInfo[]>`
    SELECT
      current_database() AS database,
      current_user AS role,
      inet_server_port() AS port
  `;

  console.log("Prisma connected:", rows[0]);
}

main()
  .catch((error) => {
    console.error("Prisma connection failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  
```

### ./scripts/check-recipe-import.ts

```typescript
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
```

### ./scripts/import-recipe-json.ts

```typescript
/** Локальный пример импорта из файла. НЕ является публичным API. */
import "dotenv/config";
import { readFile, stat } from "node:fs/promises";
import { prisma } from "../app/lib/prisma";
import { saveRecipe } from "../app/lib/recipe-import/save-recipe";

async function main() {
  const filePath = process.argv[2];
  const allowNew = process.argv.includes("--allow-new-ingredients");
  if (!filePath || filePath.startsWith("--")) {
    throw new Error(
      "Использование: npx.cmd tsx scripts/import-recipe-json.ts examples/recipe-import.example.json",
    );
  }
  const metadata = await stat(filePath);
  if (metadata.size > 256 * 1024) {
    throw new Error("JSON слишком большой (ограничение для локального импорта: 256 КБ)");
  }
  const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  const saved = await saveRecipe(raw, {
    mode: "create",
    allowCreateIngredients: allowNew,
  });
  console.log(`Рецепт создан: /recipes/${saved.slug} (ID ${saved.id})`);
}

main()
  .catch((error: unknown) => {
    console.error("Не удалось импортировать рецепт:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### ./tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```
