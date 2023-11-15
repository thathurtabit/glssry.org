import type { INotification } from "~/types/common.types";

export interface INotificationsState {
  notifications: INotification[] | null;
}
