import type { Prisma, TagName, User } from "@prisma/client";
import type { TPost } from "~/schemas/post/post.schema";

/** Turn TPost data into data ready be saved to db */
export const getPostData = (input: TPost, userData: User): Prisma.PostCreateInput => ({
  title: input.title,
  slug: input.slug,
  acronym: input.acronym,
  abbreviation: input.abbreviation,
  initialism: input.initialism,
  author: {
    connect: {
      id: userData?.id,
    },
  },
  versions: {
    create: {
      title: input.title,
      slug: input.slug,
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
      published: false, // This needs to be manually published by editors/admins
      tags: JSON.stringify(input.tags),
    },
  },
});
