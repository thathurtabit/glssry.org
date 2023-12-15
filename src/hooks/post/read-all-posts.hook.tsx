import { api } from "~/utils/api";

export const useReadAllPosts = () => {
  const { data, isFetching, error, isError } = api.post.readAllPosts.useQuery();

  return {
    postsData: data,
    postsDataIsFetching: isFetching,
    postsDataHasError: isError,
    postsDataError: error,
  };
};
