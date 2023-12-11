import { postSchema } from "~/schemas/post/post.schema";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { protectedProcedure } from "~/server/api/trpc";
import { errorMessage } from "../../utils/error-message";
import { sharedReadUserData } from "../shared/user/shared-read-user-data";
import { getPostData } from "../shared/post/get-post-data.util";

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
    return post;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message } = error;
      throw new TRPCError({
        code: error.code,
        message: errorMessage.readPost(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readPost(500, error as string));
  }
});