import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { publicProcedure } from "~/server/api/trpc";
import { errorMessage } from "../../utils/error-message";
import { z } from "zod";

export const readPost = publicProcedure.input(
  z.object({
    id: z.string(),
  })
).query(async ({ input, ctx }) => {
  try {
    const post = await ctx.db.post.findUnique({
      where: { id: input.id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        versions: true,
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
