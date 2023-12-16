import { api } from "~/utils/api";

export const useReadLatestPosts = () => {
  const { data, isFetching, error, isError } =
    api.post.readLatestPosts.useQuery();

  return {
    latestPostsData: data,
    latestPostsDataIsFetching: isFetching,
    latestPostsDataHasError: isError,
    latestPostsDataError: error,
  };
};
