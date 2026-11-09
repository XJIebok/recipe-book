
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
