
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
