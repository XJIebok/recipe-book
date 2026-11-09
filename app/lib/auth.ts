
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
