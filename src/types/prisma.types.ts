import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import type { readUser } from "~/server/api/handlers/account/read-user";
import type { createPost } from "~/server/api/handlers/post/create-post";
import type { readAllPendingPosts } from "~/server/api/handlers/post/read-all-pending-posts";
import type { readAllPosts } from "~/server/api/handlers/post/read-all-posts";
import type { readAllPostsInCategory } from "~/server/api/handlers/post/read-all-posts-in-category";
import type { readLatestPosts } from "~/server/api/handlers/post/read-latest-posts";
import type { readPost } from "~/server/api/handlers/post/read-post";
import type { readRandomCategoryPostCount } from "~/server/api/handlers/post/read-random-category-post-count";
import type { readRandomPost } from "~/server/api/handlers/post/read-random-post";

// USER
export type TTRPCReadUser = inferProcedureOutput<typeof readUser>;

// POST
export type TTRPCCreatePost = inferProcedureInput<typeof createPost>;
export type TTRPCReadPost = inferProcedureOutput<typeof readPost>;
export type TTRPCReadRandomPost = inferProcedureOutput<typeof readRandomPost>;
export type TTRPCReadRandomCategoryPostCount = inferProcedureOutput<typeof readRandomCategoryPostCount>;
export type TTRPCReadRandomCategoryPostCountItem = TTRPCReadRandomCategoryPostCount[0];
export type TTRPCReadAllPosts = inferProcedureOutput<typeof readAllPosts>;
export type TTRPCReadLatestPosts = inferProcedureOutput<typeof readLatestPosts>;
export type TTRPCReadCategoryPosts = inferProcedureOutput<typeof readAllPostsInCategory>;
export type TTRPCReadLatestPost = TTRPCReadLatestPosts[0];
export type TTRPCReadAllPendingPosts = inferProcedureOutput<typeof readAllPendingPosts>;
