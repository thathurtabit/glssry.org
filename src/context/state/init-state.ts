import type { IGlssryState } from "../types/context.types";

export const initState: IGlssryState = {
  page: {
    isMenuOpen: false,
    modal: {
      title: null,
      type: null,
      content: null,
      footer: null,
    },
  },
  notifications: null,
};
