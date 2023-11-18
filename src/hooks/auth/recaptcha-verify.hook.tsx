import { api } from "~/utils/api";
import { useContext, useId } from "react";
import { GlssryDispatchContext } from "~/context/context/context";
import { setNewNotification } from "~/context/actions/notifications/notifications.actions";

export const useVerifyRecaptchaMutation = () => {
  const dispatch = useContext(GlssryDispatchContext);
  const onSuccessId = useId();

  const { mutate, mutateAsync, error, isLoading } =
    api.account.verifyRecaptcha.useMutation({
      onSuccess() {
        dispatch(
          setNewNotification({
            uuid: onSuccessId, // Hoping this will only run once to prevent spamming notifications
            type: "success",
            title: "Success",
            message: "It appears you are human!",
          })
        );
      },
    });

  return {
    mutateVerifyRecaptcha: mutate,
    mutateVerifyRecaptchaAsync: mutateAsync,
    mutateVerifyRecaptchaLoading: isLoading,
    mutateVerifyRecaptchaError: error,
  };
};
