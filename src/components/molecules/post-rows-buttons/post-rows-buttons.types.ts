import type { TTRPCReadPost } from "~/types/prisma.types";

export interface IPostRowsButtons {
  isLoading?: boolean
  postsData?: NonNullable<TTRPCReadPost>[]
  itemsCount?: number
  onClickCallback: (postData: NonNullable<TTRPCReadPost>) => void
}
