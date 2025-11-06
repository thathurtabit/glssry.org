import { useContext, useId } from "react";

import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { GlssryDispatchContext } from "~/context/context/context";
import { api } from "~/utils/api";

export const useUsernameMutation = () => {
  const dispatch = useContext(GlssryDispatchContext);
  const trpcContext = api.useUtils();
  const usernameCreatedId = useId();

  const { mutate, mutateAsync, error, isPending } =
    api.account.upsertUsername.useMutation({
      async onMutate() {
        await trpcContext.account.readUser.cancel();

        const optimisticUpdate = trpcContext.account.readUser.getData();

        if (optimisticUpdate) {
          trpcContext.account.readUser.setData(undefined, optimisticUpdate);
        }
      },
      onSuccess() {
        dispatch(
          setNewNotification({
            uuid: usernameCreatedId, // Hoping this will only run once to prevent spamming notifications
            type: "success",
            title: "Success",
            message: "Username created!",
          })
        );
      },
      async onSettled() {
        await trpcContext.account.readUser.invalidate();
      },
    });

  return {
    mutateUsername: mutate,
    mutateUsernameAsync: mutateAsync,
    mutateUsernameLoading: isPending,
    mutateUsernameError: error,
  };
};
