import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import type { readUser } from "~/server/api/handlers/account/read-user";
import type { createPost } from "~/server/api/handlers/post/create-post";
import type { readPost } from "~/server/api/handlers/post/read-post";

// USER
export type TTRPCReadUser = inferProcedureOutput<typeof readUser>;

// POST
export type TTRPCCreatePost = inferProcedureInput<typeof createPost>;
export type TTRPCReadPost = inferProcedureOutput<typeof readPost>;
