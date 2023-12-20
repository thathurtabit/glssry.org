import { api } from "~/utils/api";
import type { TNativeTag } from "~/schemas/post/post.schema";

export interface IUseReadAllPostsInCategory {
  category: TNativeTag;
}

export const useReadAllPostsInCategory = ({
  category,
}: IUseReadAllPostsInCategory) => {
  const { data, isFetching, error, isError } =
    api.post.readAllPostsInCategory.useQuery(
      { category },
      {
        enabled: Boolean(category),
      }
    );

  return {
    categoryPostsData: data,
    categoryPostsDataIsFetching: isFetching,
    categoryPostsDataHasError: isError,
    categoryPostsDataError: error,
  };
};
