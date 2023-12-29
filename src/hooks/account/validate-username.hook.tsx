import { api } from "~/utils/api";
import { useContext, useId, useState } from "react";
import { GlssryDispatchContext } from "~/context/context/context";
import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { usernameSchema } from "~/schemas/account/username.schema";

export const useValidateUsername = (username = "") => {
  const dispatch = useContext(GlssryDispatchContext);
  const usernameExistsId = useId();

  const {
    isInitialLoading: doesUsernameExistLoading = false,
    refetch: runDoesUsernameExist,
    error: doesUsernameExistError,
  } = api.account.readDoesUsernameExist.useQuery(
    {
      username,
    },
    {
      enabled: false,
    }
  );

  const [validateUsernameError, setValidateUsernameError] = useState<
    string[] | null
  >(doesUsernameExistError?.message ? [doesUsernameExistError.message] : null);

  const runIsUsernameValid = async (): Promise<boolean> => {
    try {
      const schemaResult = usernameSchema.safeParse({ username });

      if (schemaResult.success) {
        setValidateUsernameError(null);
      } else {
        const errorMessages = schemaResult.error.issues.map(
          (issue) => issue.message
        );
        setValidateUsernameError(
          validateUsernameError
            ? [...new Set([...validateUsernameError, ...errorMessages])]
            : [...new Set(errorMessages)]
        );
        return false;
      }

      // Else check if username exists
      const { data: doesUsernameExist } = await runDoesUsernameExist({
        throwOnError: true,
      });
      if (doesUsernameExist) {
        dispatch(
          setNewNotification({
            uuid: usernameExistsId,
            type: "error",
            title: "Oh no!",
            message: "Username already exists",
          })
        );
        return false;
      }

      setValidateUsernameError(null);
      return true;
    } catch {
      return false;
    }
  };

  return {
    runIsUsernameValid,
    validateUsernameError,
    doesUsernameExistLoading,
  };
};
