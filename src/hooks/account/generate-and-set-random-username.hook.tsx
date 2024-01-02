import { useContext, useId, useState } from "react";

import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { GlssryDispatchContext } from "~/context/context/context";
import { api } from "~/utils/api";

import { useIsAuthenticated } from "../auth/is-authenticated.hook";

interface IUserSetData {
  onSuccess?: () => void;
  generateRandomUsername?: boolean;
}

export const useGenerateAndSetRandomUsername = ({
  onSuccess,
  generateRandomUsername,
}: IUserSetData) => {
  const trpcContext = api.useUtils();
  const dispatch = useContext(GlssryDispatchContext);
  const [hasUsernameError, setHasUsernameError] = useState<boolean>(false);
  const isAuthenticated = useIsAuthenticated();
  const onMutateId = useId();
  const onErrorId = useId();
  const onSuccessId = useId();
  const { data: randomUsername } = api.account.readRandomUsername.useQuery(
    undefined,
    {
      enabled: Boolean(generateRandomUsername) && isAuthenticated,
      refetchOnMount: false,
    }
  );

  const { mutate } = api.account.upsertUsername.useMutation({
    async onMutate() {
      setHasUsernameError(false);

      await trpcContext.account.readUser.cancel();

      dispatch(
        setNewNotification({
          uuid: onMutateId,
          type: "info",
          title: "Hold tight!",
          message: "Setting username...",
        })
      );
    },
    onError() {
      setHasUsernameError(true);
      dispatch(
        setNewNotification({
          uuid: onErrorId,
          type: "error",
          title: "Oh no!",
          message: "Error when trying to set username!",
        })
      );
    },
    onSuccess() {
      setHasUsernameError(false);
      dispatch(
        setNewNotification({
          uuid: onSuccessId,
          type: "success",
          title: "Done!",
          message: "Generated username saved",
        })
      );
      onSuccess?.();
    },
    async onSettled() {
      await trpcContext.account.readUser.invalidate();
    },
  });

  return {
    randomUsername,
    setUsername: mutate,
    hasMutateUsernameError: hasUsernameError,
  };
};
