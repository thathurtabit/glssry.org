import { useContext, useId } from "react";

import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { GlssryDispatchContext } from "~/context/context/context";
import { api } from "~/utils/api";

export interface IUseUpdatePost {
  onSuccessCallback?: () => void;
}

export const useUpdatePost = ({ onSuccessCallback }: IUseUpdatePost) => {
  const dispatch = useContext(GlssryDispatchContext);
  const updatePostMutationId = useId();
  const updatePostErrorId = useId();
  const updatePostSuccessId = useId();
  const trpcContext = api.useUtils();

  const { mutate, mutateAsync, error, isError, isLoading } =
    api.post.updatePost.useMutation({
      onMutate() {
        dispatch(
          setNewNotification({
            uuid: updatePostMutationId,
            type: "info",
            title: "Hold tight!",
            message: "Updating post...",
          })
        );
      },
      onError() {
        dispatch(
          setNewNotification({
            uuid: updatePostErrorId,
            type: "error",
            title: "Oh no!",
            message: "Error when trying to save updated post!",
          })
        );
      },
      onSuccess() {
        dispatch(
          setNewNotification({
            uuid: updatePostSuccessId,
            type: "success",
            title: "Done!",
            message: "Post updated!",
          })
        );
        onSuccessCallback?.();
      },
      async onSettled() {
        await trpcContext.post.readAllPendingPosts.invalidate();
      },
    });

  return {
    updatePostMutation: mutate,
    updatePostMutationAsync: mutateAsync,
    updatePostMutationIsLoading: isLoading,
    updatePostMutationError: error,
    updatePostMutationHasError: isError,
  };
};
