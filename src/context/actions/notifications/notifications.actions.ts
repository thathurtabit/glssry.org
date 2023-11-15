import type { INotification } from "~/types/common.types";
import type {
  IContextAction,
  TContextActionNoPayload,
} from "../../types/context.types";
import { NotificationsActions } from "./notifications.types";

export const setNewNotification = (payload: INotification): IContextAction => ({
  type: NotificationsActions.SET_NEW_NOTIFICATION,
  payload,
});

export const clearOldestNotification = (): TContextActionNoPayload => ({
  type: NotificationsActions.CLEAR_OLDEST_NOTIFICATION,
});
