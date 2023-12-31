import { useContext, useId } from "react";

import { signOut } from "next-auth/react";

import { IconDelete } from "~/components/icons/delete/delete";
import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { GlssryDispatchContext } from "~/context/context/context";
import { EURLS } from "~/settings/constants";
import { api } from "~/utils/api";

interface IDeleteUser {
  onSuccess?: () => void;
}

export const useDeleteUser = ({ onSuccess }: IDeleteUser) => {
  const dispatch = useContext(GlssryDispatchContext);
  const onMutateId = useId();
  const onErrorId = useId();
  const onSuccessId = useId();

  const { mutate } = api.account.deleteUser.useMutation({
    onMutate() {
      dispatch(
        setNewNotification({
          uuid: onMutateId,
          type: "info",
          title: "Hold tight!",
          message: "Deleting account details...",
          Icon: () => <IconDelete />,
        })
      );
    },
    onError() {
      dispatch(
        setNewNotification({
          uuid: onErrorId,
          type: "error",
          title: "Oh no!",
          message: "Error when trying to delete account details",
          Icon: () => <IconDelete />,
        })
      );
    },
    onSuccess() {
      dispatch(
        setNewNotification({
          uuid: onSuccessId,
          type: "success",
          title: "Done!",
          message: "Your account details have been deleted",
          Icon: () => <IconDelete />,
        })
      );
      onSuccess?.();
    },
    async onSettled() {
      await signOut({ callbackUrl: EURLS.Home });
    },
  });

  return {
    deleteUser: mutate,
  };
};
