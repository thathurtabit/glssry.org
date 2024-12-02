import { type Config } from "drizzle-kit";

import { environment } from "~/environment.mjs";
const { DATABASE_URL } = environment;

export default {
  schema: "./src/server/db/drizzle.schema.ts",
  dialect: "postgresql",
  out: "./src/server/migrations",
  dbCredentials: {
    url: DATABASE_URL,
  },
} satisfies Config;
