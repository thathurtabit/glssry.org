import type { FC } from "react";

import { useContext, useId } from "react";

import { Button } from "~/components/atoms/button/button";
import { IconEmail } from "~/components/icons/email/email";
import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { GlssryDispatchContext } from "~/context/context/context";
import type { TInfoTypes } from "~/types/common.types";
import { infoTypes } from "~/types/common.types";
import { getRandomItemFromArray } from "~/utils/get-random-item-from-array";
import { getRandomUsername } from "~/utils/get-username-generator";

import { EphemeralNotifications } from "../ephemeral-notifications";

interface IEphemeralNotificationsExample {
  readonly customIcon: boolean | undefined;
}

export const EphemeralNotificationsExample: FC<
  IEphemeralNotificationsExample
> = ({ customIcon = false }) => {
  const dispatch = useContext(GlssryDispatchContext);
  const notificationId = useId();

  const handleAddAnotherNotification = () => {
    dispatch(
      setNewNotification({
        uuid: notificationId,
        type: getRandomItemFromArray<TInfoTypes>(infoTypes),
        title: "Generating random username!",
        message: getRandomUsername({}),
        Icon: customIcon
          ? () => <IconEmail className="text-primary" />
          : undefined,
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
