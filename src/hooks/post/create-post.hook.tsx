import { useContext, useId } from "react";
import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { GlssryDispatchContext } from "~/context/context/context";
import { api } from "~/utils/api";

export interface IUseCreatePost {
  onSuccessCallback?: () => void;
}

export const useCreatePost = ({ onSuccessCallback }: IUseCreatePost) => {
  const dispatch = useContext(GlssryDispatchContext);
  const createPostMutationId = useId();
  const createPostErrorId = useId();
  const createPostSuccessId = useId();
  const trpcContext = api.useUtils();

  const { mutate, mutateAsync, error, isError, isLoading } =
    api.post.createPost.useMutation({
      onMutate() {
        dispatch(
          setNewNotification({
            uuid: createPostMutationId,
            type: "info",
            title: "Hold tight!",
            message: "Saving post...",
          })
        );
      },
      onError() {
        dispatch(
          setNewNotification({
            uuid: createPostErrorId,
            type: "error",
            title: "Oh no!",
            message: "Error when trying to save post data!",
          })
        );
      },
      onSuccess() {
        dispatch(
          setNewNotification({
            uuid: createPostSuccessId,
            type: "success",
            title: "Done!",
            message: "Post created!",
          })
        );
        onSuccessCallback?.();
      },
      async onSettled() {
        await trpcContext.post.readAllPendingPosts.invalidate();
      },
    });

  return {
    createPostMutation: mutate,
    createPostMutationAsync: mutateAsync,
    createPostMutationIsLoading: isLoading,
    createPostMutationError: error,
    createPostMutationHasError: isError,
  };
};
