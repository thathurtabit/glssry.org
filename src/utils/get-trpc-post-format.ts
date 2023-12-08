import type { TagName } from "@prisma/client";
import type { TPost } from "~/schemas/post/post.schema";
import type { TTRPCReadPost } from "~/types/prisma.types";

/** Used to convert form Post data to TRPC Post data format - usually for previewing from the Post Entry Form */
export const getTRPCPostFormat = (postData: TPost): TTRPCReadPost => ({
  author: {
    id: "mock-id",
    username: "original-author",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXo_6fdDW95ptr5RNFXIRlc3kuhg68ciXfPwcB2Pn3-e3AI-b1dy8q5WGis168PvZz8iQ&usqp=CAU",
  },
  id: "mock-post-id",
  authorId: "mock-author-id",
  title: postData.title,
  createdAt: new Date(),
  versions: [{
    id: "mock-version-id",
    title: postData.title,
    acronym: postData.acronym,
    abbreviation: postData.abbreviation,
    initialism: postData.initialism,
    link: postData.link,
    body: postData.body,
    author: {
      id: "mock-editor-id",
      username: "last-editor",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXo_6fdDW95ptr5RNFXIRlc3kuhg68ciXfPwcB2Pn3-e3AI-b1dy8q5WGis168PvZz8iQ&usqp=CAU",
    },
    authorId: "mock-editor-id",
    postId: "mock-post-id",
    published: true,
    updatedAt: new Date(),
    fileUnder: postData.fileUnder as unknown as TagName,
    tags: postData.tags.map((tag, index) => ({
      id: index,
      name: tag as unknown as TagName,
    })),
  }],
});
