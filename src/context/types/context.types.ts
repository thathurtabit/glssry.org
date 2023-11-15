import type { Dispatch } from "react";
import type { IPageState } from "./state/page-state.types";
import type { INotificationsState } from "./state/notifications-state.types";

export interface IGlssryState {
  page: IPageState;
  notifications: INotificationsState | null;
}

// =========================

// Reducer
export type ContextReducer = (
  state: IGlssryState,
  action: IContextAction
) => IGlssryState;

// =========================

// Actions
export interface IContextAction {
  type: string;
  payload?: unknown;
}

export type TContextActionNoPayload = Pick<IContextAction, "type">;

// =========================
// CONTEXT

export type TGlssryDispatchContext = Dispatch<IContextAction>;

export type TGlssryStateContext = IGlssryState;
