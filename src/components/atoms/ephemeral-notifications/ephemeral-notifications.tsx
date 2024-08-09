import type { FC } from "react";

import {
 Fragment, useContext, useEffect, useState,
} from "react";

import { InfoIcon } from "~/components/atoms/info-panel-icon/info-panel-icon";
import { clearOldestNotification } from "~/context/actions/notifications/notifications.actions";
import {
  GlssryDispatchContext,
  GlssryStateContext,
} from "~/context/context/context";
import type { TInfoTypes } from "~/types/common.types";

import type { IEphemeralInfoPanels } from "./ephemeral-notifications.types";

const getIconClasses = (type: TInfoTypes) => {
  switch (type) {
    case "error": {
      return "text-white";
    }

    default: {
      return "text-black";
    }
  }
};

const getIconBGClasses = (type: TInfoTypes) => {
  switch (type) {
    case "error": {
      return "bg-error text-white";
    }

    case "success": {
      return "bg-success text-black";
    }

    default: {
      return "bg-black/10";
    }
  }
};

const getIconProperties = (type: TInfoTypes) => {
  switch (type) {
    case "info": {
      return {
        viewBox: "0 0 22 22",
        size: 30,
        className: getIconClasses(type),
      };
    }

    case "error": {
      return {
        viewBox: "0 0 23 23",
        size: 40,
        className: getIconClasses(type),
      };
    }

    case "pending": {
      return {
        viewBox: "0 0 1024 1024",
        size: 24,
        className: getIconClasses(type),
      };
    }

    case "success": {
      return {
        viewBox: "2 2 20 20",
        size: 20,
        className: getIconClasses(type),
      };
    }

    case "warning": {
      return {
        viewBox: "0 0 22 22",
        size: 40,
        className: getIconClasses(type),
      };
    }

    default: {
      return {
        viewBox: "0 0 24 24",
        size: 15,
        className: getIconClasses(type),
      };
    }
  }
};

export const EphemeralNotifications: FC<IEphemeralInfoPanels> = ({
  alwaysActive = false,
}) => {
  const state = useContext(GlssryStateContext);
  const dispatch = useContext(GlssryDispatchContext);
  const { notifications: contextNotifications } = state.notifications ?? {};
  const [notifications, setNotifications] = useState(contextNotifications);

  const timeBeforeRemove = alwaysActive ? 30_000 : 1500;

  useEffect(() => {
    if (!contextNotifications) {
      return;
    }

    setNotifications(contextNotifications);
    const dispatchClearLastNotificationTimeout = setTimeout(() => {
      if (contextNotifications.at(0)) {
        dispatch(clearOldestNotification());
      }
    }, timeBeforeRemove);
    return () => {
      clearTimeout(dispatchClearLastNotificationTimeout);
    };
  }, [contextNotifications, timeBeforeRemove, dispatch]);

  if (!notifications) {
    return null;
  }

  return (
    <Fragment>
      {notifications.map(({ uuid, type, title, message, Icon }) => {
        const isActive = alwaysActive ? true : notifications.at(-1);
        const iconWrapperClasses = `w-5 h-5 flex items-center text-sm justify-center rounded-full p-1 mr-2 ${getIconBGClasses(
          type
        )}`;
        const { className, size, viewBox } = getIconProperties(type);

        return (
          isActive && (
            <dialog
              key={uuid}
              open
              className="fixed bottom-10 z-notification flex items-center justify-center rounded-full bg-white px-2 py-1.5 text-left leading-tight text-black shadow-md transition-all duration-500 ease-in-out"
            >
              {Icon ? (
                <span className={iconWrapperClasses}>
                  <Icon size={size} className={className} viewBox={viewBox} />
                </span>
              ) : (
                <span className={iconWrapperClasses}>
                  <InfoIcon
                    size={size}
                    className={className}
                    viewBox={viewBox}
                    type={type}
                  />
                </span>
              )}
              <div className="flex-1 pr-3">
                <h3 className="flex items-center font-body justify-items-start text-[0.7rem] font-semibold">
                  {title}
                </h3>
                <p className="m-0 text-[0.675rem]">{message}</p>
              </div>
            </dialog>
          )
        );
      })}
    </Fragment>
  );
};
