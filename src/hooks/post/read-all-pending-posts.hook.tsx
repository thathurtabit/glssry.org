import { api } from "~/utils/api";
import { useIsEditor } from "../auth/is-editor.hook";

export const useReadAllPendingPosts = () => {
  const isEditor = useIsEditor();
  const { data, isFetching, error, isError } =
    api.post.readAllPendingPosts.useQuery(undefined, {
      enabled: isEditor,
    });

  return {
    pendingPostsData: data,
    pendingPostsDataIsFetching: isFetching,
    pendingPostsDataHasError: isError,
    pendingPostsDataError: error,
  };
};
