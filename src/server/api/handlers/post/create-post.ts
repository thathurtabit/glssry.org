import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { postSchema } from "~/schemas/post/post.schema";
import { createCaller, protectedProcedure } from "~/server/api/trpc";
import { errorMessage } from "~/server/api/utils/error-message";

import { getPostData } from "../shared/post/get-post-data.util";
import { sharedReadUserData } from "../shared/user/shared-read-user-data";

export const createPost = protectedProcedure.input(
  postSchema
).mutation(async ({ input, ctx }) => {
  const userId = ctx.session?.user.id;

  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMessage.readPost(401, "User not logged in"),
    });
  }

  const userData = await sharedReadUserData(userId, ctx.db);

  if (!userData) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMessage.readPost(401, "Cannot find current user"),
    });
  }

  const postData = getPostData(input, userData);

  try {
    const post = await ctx.db.post.create({
      data: {
        ...postData,
      },
    });

    // TODO: add email here
    const caller = createCaller({
      db: ctx.db,
      session: ctx.session,
    });

    return post;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.createPost(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.createPost(500, error as string));
  }
});
