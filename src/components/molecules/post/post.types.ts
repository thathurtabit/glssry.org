import type { TTRPCReadPost } from "~/types/prisma.types";

export interface IPost {
  postData: NonNullable<TTRPCReadPost>
  showRelatedPosts?: boolean
}
