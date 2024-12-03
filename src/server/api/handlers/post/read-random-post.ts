import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";
import { getShuffledArray } from "./../../../../utils/get-shuffled-array";

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

export const readRandomPosts = publicProcedure.input(z.object({ maxCount: z.number().optional() })).query(async ({ ctx, input }) => {
  const { maxCount = 2 } = input;
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

    const getShuffledArrayWithPosts = getShuffledArray(post).slice(0, maxCount);

    return getShuffledArrayWithPosts;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.readRandomPosts(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readRandomPosts(500, error as string));
  }
});
