import type { TNativeTag } from "~/schemas/post/post.schema";
import { api } from "~/utils/api";

export interface IUseReadAllPostsInCategory {
  categories: TNativeTag[];
}

export const useReadRandomisedRelatedPosts = ({
  categories,
}: IUseReadAllPostsInCategory) => {
  const { data, isFetching, error, isError } =
    api.post.readRandomisedRelatedPosts.useQuery(
      { categories },
      {
        enabled: Boolean(categories),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );

  return {
    randomisedRelatedPosts: data,
    randomisedRelatedPostsIsFetching: isFetching,
    randomisedRelatedPostsHasError: isError,
    randomisedRelatedPostsError: error,
  };
};
