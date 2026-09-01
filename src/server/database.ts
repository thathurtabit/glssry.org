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

// Keep the pool well under the hosting account's max_user_connections (10).
const connectionUrl = new URL(process.env.DATABASE_URL);
if (!connectionUrl.searchParams.has("connectionLimit")) {
  connectionUrl.searchParams.set("connectionLimit", "3");
}

const adapter = new PrismaMariaDb(connectionUrl.toString());

export const database =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: shouldLogQueries ? ["query", "error", "warn"] : ["error", "warn"],
  });

if (environment.NODE_ENV !== "production") {
  globalForPrisma.prisma = database;
}
