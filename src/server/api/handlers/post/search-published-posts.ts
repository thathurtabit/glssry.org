import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";

export const searchPublishedPosts = publicProcedure.input(z.object({ searchTerm: z.string() })).query(async ({ ctx, input }) => {
  const { searchTerm } = input;
  try {
    const posts = await ctx.db.post.findMany({
      where: {
        title: {
          search: searchTerm,
        },
        abbreviation: {
          search: searchTerm,
        },
        acronym: {
          search: searchTerm,
        },
        initialism: {
          search: searchTerm,
        },
        versions: {
          some: {
            published: true,
          },
        },
      },
      select: {
        id: true,
        title: true,
        abbreviation: true,
        acronym: true,
        initialism: true,
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
      take: 20,
      orderBy: {
        _relevance: {
          fields: ["title"],
          search: searchTerm,
          sort: "asc",
        },
      },
    });
    return posts;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.searchPublishedPosts(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.searchPublishedPosts(500, error as string));
  }
});
