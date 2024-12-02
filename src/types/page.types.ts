import type {
  TTRPCReadCategoryPosts, TTRPCReadLatestPosts, TTRPCReadRandomCategoryPostCount, TTRPCReadRandomPost,
} from "./prisma.types";

export interface IHomePageProperties {
  latestPostsData: TTRPCReadLatestPosts ;
  randomPostData: TTRPCReadRandomPost;
  randomCategoryPostCountData: NonNullable<TTRPCReadRandomCategoryPostCount>
}
