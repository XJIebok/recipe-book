
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
