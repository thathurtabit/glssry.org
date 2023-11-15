import { useContext, useId } from "react";
import { GlssryDispatchContext } from "~/context/context/context";
import { api } from "~/utils/api";
import { signOut } from "next-auth/react";
import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { IconDelete } from "~/components/icons/delete/delete";
import { EURLS } from "~/settings/constants";

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
          message: "Deleting your account",
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
          message: "Error when trying to delete your account",
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
          message: "Your account has been deleted",
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
