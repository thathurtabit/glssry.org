import { TRPCError } from "@trpc/server";

import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import z from "zod";

import { postSchema } from "~/schemas/post/post.schema";

import { protectedProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";
import { sharedReadUserData } from "../shared/user/shared-read-user-data";

export const updatePost = protectedProcedure.input(z.object({
  postId: z.string().min(1),
  data: postSchema,
})).mutation(async ({ input, ctx }) => {
  const userId = ctx.session?.user.id;

  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMessage.readPost(401, "User not logged in"),
    });
  }

  const userData = await sharedReadUserData(userId, ctx.db);

  if (!userData) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMessage.readPost(401, "Cannot find current user"),
    });
  }

  const updatedData = input.data;
  const { abbreviation, acronym, body, fileUnder, initialism, link, slug, title, relatedPostId1, relatedPostId2, tags } = updatedData;

  try {
    // Update the root post
    await ctx.db.post.update({
      where: {
        id: input.postId,
      },
      data: {
        abbreviation: input.data.abbreviation,
        acronym: input.data.acronym,
        initialism: input.data.initialism,
        slug: input.data.slug,
      },
    });

    // Create a new post version
    const postVersion = await ctx.db.postVersion.create({
      include: {
        post: true,
      },
      data: {
        post: {
          connect: {
            id: input.postId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
        abbreviation,
        acronym,
        body,
        fileUnder,
        initialism,
        link,
        slug,
        title,
        relatedPostId1,
        relatedPostId2,
        tags: JSON.stringify(tags),
      },
    });
    return postVersion;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.updatePost(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.updatePost(500, error as string));
  }
});
