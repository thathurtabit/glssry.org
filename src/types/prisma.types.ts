import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import type { createPost } from "~/server/api/handlers/post/create-post";
import type { readPost } from "~/server/api/handlers/post/read-post";

export type TTRPCCreatePost = inferProcedureInput<typeof createPost>;
export type TTRPCReadPost = inferProcedureOutput<typeof readPost>;
