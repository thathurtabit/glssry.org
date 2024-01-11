import { accountRouter } from "~/server/api/routers/account";
import { createTRPCRouter } from "~/server/api/trpc";

import { emailRouter } from "./routers/email";
import { postRouter } from "./routers/post";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  post: postRouter,
  email: emailRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
