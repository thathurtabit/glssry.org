import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import z from "zod";

import { editorProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";

export const publishPost = editorProcedure.input(z.object({
  postId: z.string().min(1),
})).mutation(async ({ input, ctx }) => {
  try {
    const post = await ctx.db.postVersion.update({
      where: {
        id: input.postId,
      },
      data: {
        published: true,
      },
    });
    return post;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.publishPost(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.publishPost(500, error as string));
  }
});
