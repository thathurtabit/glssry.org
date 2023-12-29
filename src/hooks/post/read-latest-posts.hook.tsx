import { api } from "~/utils/api";

export const useReadLatestPosts = () => {
  const { data, isFetching, error, isError } =
    api.post.readLatestPosts.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  return {
    latestPostsData: data,
    latestPostsDataIsFetching: isFetching,
    latestPostsDataHasError: isError,
    latestPostsDataError: error,
  };
};
