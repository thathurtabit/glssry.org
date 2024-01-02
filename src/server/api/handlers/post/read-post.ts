import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";

export const readPost = publicProcedure.input(
  z.object({
    slug: z.string(),
  })
).query(async ({ input, ctx }) => {
  try {
    const post = await ctx.db.post.findUnique({
      where: { slug: input.slug },
      select: {
        id: true,
        title: true,
        slug: true,
        abbreviation: true,
        acronym: true,
        initialism: true,
        authorId: true,
        createdAt: true,
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
        },
      },
    });
    return post;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.readPost(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readPost(500, error as string));
  }
});
