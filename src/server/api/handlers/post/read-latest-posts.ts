import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { publicProcedure } from "~/server/api/trpc";
import { errorMessage } from "../../utils/error-message";

export const readLatestPosts = publicProcedure.query(async ({ ctx }) => {
  try {
    const posts = await ctx.db.post.findMany({
      where: {
        versions: {
          some: {
            published: true,
          },
        },
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        versions: {
          select: {
            id: true,
            title: true,
            fileUnder: true,
            slug: true,
            tags: true,
            updatedAt: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
          take: 1,
        },
      },
    });
    return posts;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message } = error;
      throw new TRPCError({
        code: error.code,
        message: errorMessage.readLatestPosts(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readLatestPosts(500, error as string));
  }
});
