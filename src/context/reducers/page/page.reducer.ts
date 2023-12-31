import { initState } from "./../../state/init-state";
import type { IContextAction } from "./../../types/context.types";
import { PageActions } from "../../actions/page/page.actions.types";
import type { IModalData, IPageState } from "../../types/state/page-state.types";

export const pageReducer = (
    state: IPageState,
    { type, payload }: IContextAction
): IPageState => {
  switch (type as PageActions) {
    case PageActions.SET_MENU_OPEN: {
      return {
        ...state,
        isMenuOpen: payload as boolean,
      };
    }

    case PageActions.SET_MODAL: {
      return {
        ...state,
        modal: payload as IModalData,
      };
    }

    case PageActions.SET_CLOSE_MODAL: {
      return {
        ...state,
        isMenuOpen: initState.page.isMenuOpen,
        modal: initState.page.modal,
      };
    }

    default: {
      return state;
    }
  }
};
