import type { TagName } from "@prisma/client";
import type { TPost } from "~/schemas/post/post.schema";
import type { TTRPCReadPost } from "~/types/prisma.types";

/** Used to convert form TRPC Post data format to Post data - usually for Post Entry Form */
export const getPostFormatFromTRPC = (postData: NonNullable<TTRPCReadPost>): TPost => {
  const { versions } = postData;
  const lastVersion = versions.at(-1);

  return {
    title: lastVersion?.title ?? "",
    slug: lastVersion?.slug ?? "",
    acronym: lastVersion?.acronym ?? "",
    abbreviation: lastVersion?.abbreviation ?? "",
    initialism: lastVersion?.initialism ?? "",
    body: lastVersion?.body ?? "",
    link: lastVersion?.link ?? "",
    fileUnder: lastVersion?.fileUnder ?? "Miscellaneous",
    tags: lastVersion?.tags ? JSON.parse(lastVersion.tags as string) as TagName[] : [],
    relatedPostId1: lastVersion?.relatedPostId1 ?? "",
    relatedPostId2: lastVersion?.relatedPostId2 ?? "",
  };
};
