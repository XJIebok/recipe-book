
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
