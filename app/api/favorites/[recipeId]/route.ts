
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
