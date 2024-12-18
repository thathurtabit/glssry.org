import type { TTRPCReadPost } from "~/types/prisma.types";

export interface IPost {
  postData: NonNullable<TTRPCReadPost>
  randomisedPosts?: TTRPCReadPost[]
  showRelatedPosts?: boolean
}
