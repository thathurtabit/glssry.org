import { readLatestPosts } from "~/server/api/handlers/post/read-latest-posts";
import { publishPost } from "~/server/api/handlers/post/publish-post";
import { readAllPendingPosts } from "~/server/api/handlers/post/read-all-pending-posts";
import { updatePost } from "~/server/api/handlers/post/update-post";
import { createTRPCRouter } from "../trpc";
import { readAllPosts } from "~/server/api/handlers/post/read-all-posts";
import { readPost } from "~/server/api/handlers/post/read-post";
import { createPost } from "~/server/api/handlers/post/create-post";

export const postRouter = createTRPCRouter({
  readAllPosts,
  readAllPendingPosts,
  readLatestPosts,
  readPost,
  createPost,
  updatePost,
  publishPost,
});
