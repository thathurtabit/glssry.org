import type { INotification } from "~/types/common.types";
import type { INotificationsState } from "../../types/state/notifications-state.types";
import type { IContextAction } from "./../../types/context.types";
import { NotificationsActions } from "../../actions/notifications/notifications.types";

export const notificationsReducer = (
    state: INotificationsState | null,
    { type, payload }: IContextAction
): INotificationsState | null => {
  switch (type) {
    case NotificationsActions.SET_NEW_NOTIFICATION: {
      return {
        ...state,
        notifications: state?.notifications
          ? [...state.notifications, payload as INotification]
          : [payload as INotification],
      };
    }

    case NotificationsActions.CLEAR_OLDEST_NOTIFICATION: {
      return {
        ...state,
        notifications: state?.notifications
          ? state.notifications.slice(1)
          : null,
      };
    }

    default: {
      return state;
    }
  }
};
