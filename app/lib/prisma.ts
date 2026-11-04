
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

