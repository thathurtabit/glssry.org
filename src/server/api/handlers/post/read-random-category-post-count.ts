import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { publicProcedure } from "~/server/api/trpc";
import { errorMessage } from "../../utils/error-message";
import { z } from "zod";
import { tagKeys } from "~/schemas/post/post.schema";
import { getShuffledArray } from "~/utils/get-shuffled-array";

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

    const postsInCategories = publishedPosts.reduce((acc, post) => {
      const lastVersion = post.versions.at(-1);

      if (!lastVersion) {
        return acc;
      }

      const { fileUnder } = lastVersion;

      const currentCount = acc.get(fileUnder);

      if (currentCount === undefined) {
        return acc;
      }

      acc.set(fileUnder, currentCount + 1);

      return acc;
    }, initialEmptyCategoriesMap);

    const postsShuffledCategoryPostCountArray = getShuffledArray([...postsInCategories.entries()]).slice(0, maxCount);

    return postsShuffledCategoryPostCountArray;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message } = error;
      throw new TRPCError({
        code: error.code,
        message: errorMessage.readRandomCategoryPostCount(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readRandomCategoryPostCount(500, error as string));
  }
});
