import { PrismaClient } from "@prisma/client";

// Create a singleton Prisma Client to avoid exhausting connections during
// development with Hot Module Replacement. See https://www.prisma.io/docs/guides
declare global {
  // allow storing Prisma client on global for HMR in dev
  var __prisma: PrismaClient | undefined;
}

const prisma = global.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global.__prisma = prisma;

export default prisma;
