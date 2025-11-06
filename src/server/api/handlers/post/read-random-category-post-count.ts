import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { z } from "zod";

import { tagKeys } from "~/schemas/post/post.schema";
import { publicProcedure } from "~/server/api/trpc";
import { getShuffledArray } from "~/utils/get-shuffled-array";

import { errorMessage } from "../../utils/error-message";

export const readRandomCategoryPostCount = publicProcedure.input(z.object({ maxCount: z.number().optional() })).query(async ({ ctx, input }) => {
  const { maxCount = 10 } = input;
  try {
    const publishedPosts = await ctx.db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        versions: {
          select: {
            fileUnder: true,
            published: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
          take: 1,
        },
      },
    });

    const initialEmptyCategoriesMap = new Map(tagKeys.map((tagKey) => [tagKey, 0]));

     
    const postsInCategories = publishedPosts.reduce((accumulator, post) => {
      const lastVersion = post.versions.at(-1);

      if (!lastVersion) {
        return accumulator;
      }

      const { fileUnder } = lastVersion;

      const currentCount = accumulator.get(fileUnder);

      if (currentCount === undefined) {
        return accumulator;
      }

      accumulator.set(fileUnder, currentCount + 1);

      return accumulator;
    }, initialEmptyCategoriesMap);

    const postsShuffledCategoryPostCountArray = getShuffledArray([...postsInCategories.entries()]).slice(0, maxCount);

    return postsShuffledCategoryPostCountArray;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.readRandomCategoryPostCount(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readRandomCategoryPostCount(500, error as string));
  }
});
