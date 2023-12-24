import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { publicProcedure } from "~/server/api/trpc";
import { errorMessage } from "../../utils/error-message";
import { z } from "zod";
import { ZNativeTagEnum } from "~/schemas/post/post.schema";
import type { TagName } from "@prisma/client";
import { getTagsArrayFromJsonArray } from "~/utils/get-tags-array-from-json-array";

export const readRandomisedRelatedPosts = publicProcedure.input(z.object({ categories: z.array(ZNativeTagEnum), maxCount: z.number().optional() })).query(async ({ ctx, input }) => {
  const { categories, maxCount = 2 } = input;
  try {
    const publishedPosts = await ctx.db.post.findMany({
      where: {
        versions: {
          some: {
            published: true,
          },
        },
      },
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        versions: {
          select: {
            id: true,
            title: true,
            fileUnder: true,
            acronym: true,
            body: true,
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

    const relatedPosts = publishedPosts.filter(({ versions }) => {
      const latestVersion = versions.at(-1);
      if (!latestVersion) {
        return false;
      }

      const { fileUnder, tags } = latestVersion;
      const tagsArray = getTagsArrayFromJsonArray(tags);
      const conjoinedTaxonomiesFromPublishedPosts = [...fileUnder, ...tagsArray];
      const relatedPosts = conjoinedTaxonomiesFromPublishedPosts.filter((postCategory) => categories.includes(postCategory as TagName));
      return relatedPosts.length > 0;
    });

    const randomisedRelatedPosts = relatedPosts.sort(() => Math.random() - Math.random()).slice(0, maxCount);

    const uniqueRelatedPosts = randomisedRelatedPosts.filter((post, index, self) => {
      const { id } = post;
      const isUnique = self.findIndex((post) => post.id === id) === index;
      return isUnique;
    });

    return uniqueRelatedPosts;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message } = error;
      throw new TRPCError({
        code: error.code,
        message: errorMessage.readRandomisedRelatedPosts(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readRandomisedRelatedPosts(500, error as string));
  }
});
