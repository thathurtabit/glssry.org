import type { IContextAction } from "~/context/types/context.types";
import type { IModalData } from "~/context/types/state/page-state.types";
import { PageActions } from "./page.actions.types";

export const setMenuOpen = (payload: boolean): IContextAction => ({
  type: PageActions.SET_MENU_OPEN,
  payload,
});

export const setModal = (payload: IModalData): IContextAction => ({
  type: PageActions.SET_MODAL,
  payload,
});

export const setCloseModal = (): IContextAction => ({
  type: PageActions.SET_CLOSE_MODAL,
});

