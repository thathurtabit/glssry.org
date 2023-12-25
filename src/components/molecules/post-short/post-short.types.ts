import type { TTRPCReadRandomPost } from "~/types/prisma.types";

export interface IPostShort {
  postTitle?: string
  isLoading?: boolean
  postData?: TTRPCReadRandomPost
  className?: string
}
