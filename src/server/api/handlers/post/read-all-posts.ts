import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { publicProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";

export const readAllPosts = publicProcedure.query(async ({ ctx }) => {
  try {
    const posts = await ctx.db.post.findMany({
      where: {
        versions: {
          some: {
            published: true,
          },
        },
      },
      take: 100, // NOTE: This is a temporary limit
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.readAllPosts(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readAllPosts(500, error as string));
  }
});
