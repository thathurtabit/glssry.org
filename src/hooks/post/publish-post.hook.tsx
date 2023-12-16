import { useContext, useId } from "react";
import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { GlssryDispatchContext } from "~/context/context/context";
import { api } from "~/utils/api";

export const usePublishPost = () => {
  const dispatch = useContext(GlssryDispatchContext);
  const publishPostMutationId = useId();
  const publishPostErrorId = useId();
  const publishPostSuccessId = useId();
  const trpcContext = api.useUtils();

  const { mutate, mutateAsync, error, isError, isLoading } =
    api.post.publishPost.useMutation({
      onMutate() {
        dispatch(
          setNewNotification({
            uuid: publishPostMutationId,
            type: "info",
            title: "Hold tight!",
            message: "Publishing post...",
          })
        );
      },
      onError() {
        dispatch(
          setNewNotification({
            uuid: publishPostErrorId,
            type: "error",
            title: "Oh no!",
            message: "Error when trying to save publish post!",
          })
        );
      },
      onSuccess() {
        dispatch(
          setNewNotification({
            uuid: publishPostSuccessId,
            type: "success",
            title: "Done!",
            message: "Post published!",
          })
        );
      },
      async onSettled() {
        await trpcContext.post.readAllPosts.invalidate();
      },
    });

  return {
    publishPostMutation: mutate,
    publishPostMutationAsync: mutateAsync,
    publishPostMutationIsLoading: isLoading,
    publishPostMutationError: error,
    publishPostMutationHasError: isError,
  };
};
