import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { publicProcedure } from "~/server/api/trpc";

import { getShuffledArray } from "./../../../../utils/get-shuffled-array";
import { errorMessage } from "../../utils/error-message";

export const readRandomPost = publicProcedure.query(async ({ ctx }) => {
  try {
    const post = await ctx.db.post.findMany({
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
          take: 1,
          orderBy: {
            updatedAt: "desc",
          },
          where: {
            published: true,
          },
        },
      },
    });

    const getShuffledArrayWithPost = getShuffledArray(post).at(0);

    return getShuffledArrayWithPost;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.readRandomPost(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readRandomPost(500, error as string));
  }
});
