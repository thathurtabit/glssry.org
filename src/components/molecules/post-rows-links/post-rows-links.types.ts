import type { TTRPCReadCategoryPosts, TTRPCReadLatestPost, TTRPCReadLatestPosts } from "~/types/prisma.types";

export interface IPostRowsLinks {
  isLoading?: boolean
  postsData?: NonNullable<TTRPCReadLatestPosts | TTRPCReadCategoryPosts>
  onClickCallback?: (postData: NonNullable<TTRPCReadLatestPost>) => void
}
