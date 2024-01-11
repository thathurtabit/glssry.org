import { newPostEmailNotification } from "~/server/api/handlers/email/new-post";

import { createTRPCRouter } from "../trpc";

export const emailRouter = createTRPCRouter({
  newPostEmailNotification,
});
