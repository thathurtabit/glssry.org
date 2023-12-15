import { api } from "~/utils/api";

export const useReadAllPendingPosts = () => {
  const { data, isFetching, error, isError } =
    api.post.readAllPendingPosts.useQuery();

  return {
    pendingPostsData: data,
    pendingPostsDataIsFetching: isFetching,
    pendingPostsDataHasError: isError,
    pendingPostsDataError: error,
  };
};
