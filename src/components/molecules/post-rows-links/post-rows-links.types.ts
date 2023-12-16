import type { TTRPCReadLatestPost, TTRPCReadLatestPosts } from "~/types/prisma.types";

export interface IPostRowsLinks {
  isLoading?: boolean
  postsData?: NonNullable<TTRPCReadLatestPosts>
  onClickCallback?: (postData: NonNullable<TTRPCReadLatestPost>) => void
}
