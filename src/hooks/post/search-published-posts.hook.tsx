import { api } from "~/utils/api";

export interface IUseSearchPublishedPosts {
  searchTerm: string;
  shouldSearch?: boolean;
}

export const useSearchPublishedPosts = ({
  searchTerm,
  shouldSearch = true,
}: IUseSearchPublishedPosts) => {
  const { data, isFetching, error, isError } =
    api.post.searchPublishedPosts.useQuery(
      { searchTerm },
      {
        enabled: Boolean(searchTerm && shouldSearch),
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
      }
    );

  return {
    searchedPublishedPostsData: data,
    searchedPublishedPostsDataError: error,
    searchedPublishedPostsDataHasError: isError,
    searchedPublishedPostsDataIsFetching: isFetching,
  };
};
