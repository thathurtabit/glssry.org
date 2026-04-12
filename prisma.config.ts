import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Use process.env directly so prisma generate (which doesn't need the URL)
    // doesn't fail in CI when DATABASE_URL is not set.
    url: process.env.DATABASE_URL ?? "",
  },
});
