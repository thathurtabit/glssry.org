import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "~/server/api/root";

type TRouterInput = inferRouterInputs<AppRouter>;
type TRouterOutput = inferRouterOutputs<AppRouter>;

// USER
export type TTRPCReadUser = TRouterOutput["account"]["readUser"];

// POST
export type TTRPCCreatePost = TRouterInput["post"]["createPost"];
export type TTRPCReadPost = TRouterOutput["post"]["readPost"];
export type TTRPCReadRandomPost = TRouterOutput["post"]["readRandomPost"];
export type TTRPCReadRandomCategoryPostCount = TRouterOutput["post"]["readRandomCategoryPostCount"];
export type TTRPCReadRandomCategoryPostCountItem = TTRPCReadRandomCategoryPostCount[0];
export type TTRPCReadAllPosts = TRouterOutput["post"]["readAllPosts"];
export type TTRPCReadLatestPosts = TRouterOutput["post"]["readLatestPosts"];
export type TTRPCReadCategoryPosts = TRouterOutput["post"]["readAllPostsInCategory"];
export type TTRPCReadLatestPost = TTRPCReadLatestPosts[0];
export type TTRPCReadAllPendingPosts = TRouterOutput["post"]["readAllPendingPosts"];
export type TTRPCSearchPublishedPosts = TRouterOutput["post"]["searchPublishedPosts"];
export type TTRPCSearchPublishedPost = TTRPCSearchPublishedPosts[0];
