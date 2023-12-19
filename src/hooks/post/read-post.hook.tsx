import { api } from "~/utils/api";

export interface IReadPost {
  slug: string;
}

export const useReadPost = ({ slug }: IReadPost) => {
  const { data, isFetching, error, isError } = api.post.readPost.useQuery(
    {
      slug,
    },
    {
      enabled: Boolean(slug),
    }
  );

  return {
    postData: data,
    postDataIsFetching: isFetching,
    postDataHasError: isError,
    postDataError: error,
  };
};
