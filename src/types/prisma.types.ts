import type { inferProcedureOutput } from "@trpc/server";
import type { readPost } from "~/server/api/handlers/post/read-post";

export type TTRPCReadPost = inferProcedureOutput<typeof readPost>;
