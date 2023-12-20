import { api } from "~/utils/api";

export interface IUseSearchPublishedPosts {
  searchTerm: string;
}

export const useSearchPublishedPosts = ({
  searchTerm,
}: IUseSearchPublishedPosts) => {
  console.log({ searchTerm });
  const { data, isFetching, error, isError } =
    api.post.searchPublishedPosts.useQuery(
      { searchTerm },
      {
        enabled: Boolean(searchTerm),
      }
    );

  return {
    searchedPublishedPostsData: data,
    searchedPublishedPostsDataError: error,
    searchedPublishedPostsDataHasError: isError,
    searchedPublishedPostsDataIsFetching: isFetching,
  };
};
