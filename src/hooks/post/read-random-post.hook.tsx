import { api } from "~/utils/api";

export const useReadRandomPost = () => {
  const { data, isFetching, error, isError } =
    api.post.readRandomPost.useQuery();

  return {
    randomPostData: data,
    randomPostDataIsFetching: isFetching,
    randomPostDataHasError: isError,
    randomPostDataError: error,
  };
};
