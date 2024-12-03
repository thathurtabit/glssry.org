import type { TTRPCReadPost } from "~/types/prisma.types";

export interface IRelatedPosts {
  title?: string;
  randomisedPosts?: TTRPCReadPost[]
}
