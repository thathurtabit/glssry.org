import { api } from "~/utils/api";

export interface IReadPost {
  id: string;
}

export const useReadPost = ({ id }: IReadPost) => {
  const { data, isFetching, error, isError } = api.post.readPost.useQuery(
    {
      id,
    },
    {
      enabled: Boolean(id),
    }
  );

  return {
    postData: data,
    postDataIsFetching: isFetching,
    postDataHasError: isError,
    postDataError: error,
  };
};
