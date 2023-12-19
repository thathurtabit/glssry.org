import type { TagName } from "@prisma/client";
import type { TPost } from "~/schemas/post/post.schema";
import type { TTRPCReadPost } from "~/types/prisma.types";

/** Used to convert form Post data to TRPC Post data format - usually for previewing from the Post Entry Form */
export const getTRPCPostFormat = (postData: TPost): TTRPCReadPost => ({
  author: {
    id: "mock-id",
    username: "original-author",
    image: "",
  },
  id: "mock-post-id",
  slug: "mock-post-slug",
  authorId: "mock-author-id",
  title: postData.title,
  createdAt: new Date(),
  versions: [{
    id: "mock-version-id",
    slug: postData.slug,
    title: postData.title,
    acronym: postData.acronym,
    abbreviation: postData.abbreviation,
    initialism: postData.initialism,
    link: postData.link,
    body: postData.body,
    author: {
      id: "",
      username: "",
      image: "",
    },
    authorId: "",
    postId: "mock-post-id",
    published: true,
    updatedAt: new Date(),
    fileUnder: postData.fileUnder as unknown as TagName,
    tags: postData.tags?.map((tag, index) => ({
      id: index,
      name: tag as unknown as TagName,
    })) ?? null,
    relatedPostId1: postData.relatedPostId1 ?? null,
    relatedPostId2: postData.relatedPostId2 ?? null,
  }],
});
