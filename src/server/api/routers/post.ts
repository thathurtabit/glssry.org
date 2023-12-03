import { createTRPCRouter } from "../trpc";
import { readPost } from "~/server/api/handlers/post/read-post";

export const postRouter = createTRPCRouter({
  readPost,
});
