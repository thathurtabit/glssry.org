import type { TTRPCReadRandomCategoryPostCount, TTRPCReadRandomCategoryPostCountItem } from "~/types/prisma.types";

export interface ICategoryRowsLinks {
  isLoading?: boolean
  categoryData?: NonNullable<TTRPCReadRandomCategoryPostCount>
  itemsCount?: number
  onClickCallback?: (postData: NonNullable<TTRPCReadRandomCategoryPostCountItem>) => void
}
