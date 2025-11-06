 
import { initState } from "~/context/state/init-state";
import type { IGlssryState } from "~/context/types/context.types";

export const initialState: IGlssryState = {
  ...initState,
  page: {
    isMenuOpen: false,
    modal: {
      background: "light",
      preTitle: "Pre title",
      title: "Title",
      type: "small",
      footer: {
        confirm: {
          onClick: () => console.log("Confirm clicked"),
        },
        cancel: {
          onClick: () => console.log("Cancel clicked"),
        },
      },
      content: <p>Modal content right here</p>,
    },
  },
};

export const darkInitialState: IGlssryState = {
  ...initialState,
  page: {
    ...initialState.page,
    modal: {
      ...initialState.page.modal,
      background: "dark",
    },
  },
};
