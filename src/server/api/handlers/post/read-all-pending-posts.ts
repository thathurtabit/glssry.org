import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { editorProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";

export const readAllPendingPosts = editorProcedure.query(async ({ ctx }) => {
  try {
    const posts = await ctx.db.post.findMany({
      where: {
        versions: {
          some: {
            published: false,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        versions: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
          take: 1, // Take last item
        },
      },
      take: 100,
      orderBy: {
        createdAt: "desc",
      },
    });

    const filteredPosts = posts.filter((post) => {
      const latestVersion = post.versions.at(-1);
      return !latestVersion?.published;
    });

    return filteredPosts;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.readAllPendingPosts(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readAllPendingPosts(500, error as string));
  }
});
