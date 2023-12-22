import type { TNativeTag } from "~/schemas/post/post.schema";
import { api } from "~/utils/api";

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
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );

  return {
    categoryPostsData: data,
    categoryPostsDataIsFetching: isFetching,
    categoryPostsDataHasError: isError,
    categoryPostsDataError: error,
  };
};
