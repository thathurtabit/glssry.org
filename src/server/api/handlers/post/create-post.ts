import { postSchema } from "~/schemas/post/post.schema";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { publicProcedure } from "~/server/api/trpc";
import { errorMessage } from "../../utils/error-message";
import { sharedReadUserData } from "../shared/user/shared-read-user-data";
import type { TagName } from "@prisma/client";

export const createPost = publicProcedure.input(
  postSchema
).query(async ({ input, ctx }) => {
  const userId = ctx.session?.user.id;

  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMessage.readPost(401, "User not logged in"),
    });
  }

  const userData = await sharedReadUserData(userId, ctx.db);

  try {
    const post = await ctx.db.post.create({
      data: {
        title: input.title,
        versions: {
          create: {
            title: input.title,
            abbreviation: input.abbreviation,
            acronym: input.acronym,
            initialism: input.initialism,
            fileUnder: input.fileUnder as TagName,
            body: input.body,
            link: input.link,
            author: {
              connect: {
                id: userData?.id,
              },
            },
            published: false,
            tags: {
              create: {
                data: input.tags.map((tag) => ({
                  name: tag,
                })),
              },
            },

          },
        },
        author: {
          connect: {
            id: userData?.id,
          },
        },
      },
    });
    return post;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message } = error;
      throw new TRPCError({
        code: error.code,
        message: errorMessage.readPost(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readPost(500, error as string));
  }
});
