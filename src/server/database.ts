import { PrismaClient } from "@prisma/client";

import { environment } from "~/environment.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const database =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      environment.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (environment.NODE_ENV !== "production") {
  globalForPrisma.prisma = database;
}
