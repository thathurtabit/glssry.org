import type { FC } from "react";
import type { INotification } from "~/types/common.types";
import { useContext, useId } from "react";
import { EphemeralNotifications } from "../ephemeral-notifications";
import { GlssryDispatchContext } from "../../../../context/context/context";
import { setNewNotification } from "../../../../context/actions/notifications/notifications.actions";
import { Button } from "../../button/button";

interface IEphemeralNotificationsExample {
  customIcon: boolean | undefined;
}

const getCapitalizedFirstLetter = (word: string) => {
  const firstLetter = word.at(0)?.toUpperCase() ?? "?";
  return firstLetter + String(word.slice(1));
};

export const EphemeralNotificationsListExample: FC<
  IEphemeralNotificationsExample
> = () => {
  const dispatch = useContext(GlssryDispatchContext);
  const notificationId = useId();

  const handleDispatchType = (type: INotification["type"]) => {
    dispatch(
      setNewNotification({
        uuid: notificationId,
        type,
        title: `${getCapitalizedFirstLetter(type)} message`,
        message: `This is an ${type} message`,
      })
    );
  };

  return (
    <div className="flex h-full flex-col items-start justify-center">
      <EphemeralNotifications alwaysActive />
      <div className="flex flex-col items-start justify-center gap-2">
        <Button size="small" onClick={() => handleDispatchType("info")}>
          Info
        </Button>
        <Button size="small" onClick={() => handleDispatchType("error")}>
          Error
        </Button>
        <Button size="small" onClick={() => handleDispatchType("pending")}>
          Pending
        </Button>
        <Button size="small" onClick={() => handleDispatchType("warning")}>
          Warning
        </Button>
        <Button size="small" onClick={() => handleDispatchType("success")}>
          Success
        </Button>
      </div>
    </div>
  );
};
