
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
