import type { FC } from "react";
import type { TInfoTypes } from "~/types/common.types";
import { useContext, useId } from "react";
import { EphemeralNotifications } from "../ephemeral-notifications";
import { getRandomUsername } from "../../../../utils/get-username-generator";
import { GlssryDispatchContext } from "../../../../context/context/context";
import { setNewNotification } from "../../../../context/actions/notifications/notifications.actions";
import { getRandomItemFromArray } from "../../../../utils/get-random-item-from-array";
import { infoTypes } from "~/types/common.types";
import { Button } from "../../button/button";
import { IconEmail } from "../../../icons/email/email";

export const EphemeralNotificationsCustomIconExample: FC = () => {
  const dispatch = useContext(GlssryDispatchContext);
  const notificationId = useId();

  const handleAddAnotherNotification = () => {
    dispatch(
      setNewNotification({
        uuid: notificationId,
        type: getRandomItemFromArray<TInfoTypes>(infoTypes),
        title: "Generating random username!",
        message: getRandomUsername({}),
        Icon: () => <IconEmail />,
      })
    );
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <EphemeralNotifications />
      <Button
        className="fixed left-5 top-5"
        onClick={handleAddAnotherNotification}
      >
        Generate new notification
      </Button>
    </div>
  );
};
