import { createPost } from "~/server/api/handlers/post/create-post";
import { publishPost } from "~/server/api/handlers/post/publish-post";
import { readAllPendingPosts } from "~/server/api/handlers/post/read-all-pending-posts";
import { readAllPosts } from "~/server/api/handlers/post/read-all-posts";
import { readLatestPosts } from "~/server/api/handlers/post/read-latest-posts";

import { readPost } from "~/server/api/handlers/post/read-post";
import { updatePost } from "~/server/api/handlers/post/update-post";

import { createTRPCRouter } from "../trpc";
import { readAllPostsInCategory } from "./../handlers/post/read-all-posts-in-category";
import { readRandomCategoryPostCount } from "./../handlers/post/read-random-category-post-count";
import { readRandomPost } from "./../handlers/post/read-random-post";
import { readRandomisedRelatedPosts } from "./../handlers/post/read-randomised-related-posts";
import { searchPublishedPosts } from "./../handlers/post/search-published-posts";

export const postRouter = createTRPCRouter({
  createPost,
  publishPost,
  readAllPendingPosts,
  readAllPosts,
  readAllPostsInCategory,
  readLatestPosts,
  readPost,
  readRandomPost,
  readRandomisedRelatedPosts,
  readRandomCategoryPostCount,
  searchPublishedPosts,
  updatePost,
});
