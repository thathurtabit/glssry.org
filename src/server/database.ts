import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

import { environment } from "~/environment.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const shouldLogQueries =
  environment.NODE_ENV === "development" && process.env.PRISMA_LOG_QUERIES === "true";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to initialize Prisma");
}

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

export const database =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: shouldLogQueries ? ["query", "error", "warn"] : ["error", "warn"],
  });

if (environment.NODE_ENV !== "production") {
  globalForPrisma.prisma = database;
}
