import type { TTRPCReadCategoryPosts, TTRPCReadLatestPost, TTRPCReadLatestPosts } from "~/types/prisma.types";

export type TPostRowsData = NonNullable<TTRPCReadLatestPosts> | NonNullable<TTRPCReadCategoryPosts>;
export type TPostRowsDataItem = TPostRowsData[number];

export interface IPostRowsLinks {
  isLoading?: boolean
  postsData?: TPostRowsData
  itemsCount?: number
  onClickCallback?: (postData: TPostRowsDataItem | NonNullable<TTRPCReadLatestPost>) => void
}
