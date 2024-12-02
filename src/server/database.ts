import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { environment } from "~/environment.mjs";

import * as schema from "./db/drizzle.schema";

const { DATABASE_URL, NODE_ENV } = environment;

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDatabase = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDatabase.conn ?? postgres(DATABASE_URL);
if (NODE_ENV !== "production") {
  globalForDatabase.conn = conn;
}

export const database = drizzle(conn, { schema });
