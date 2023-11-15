import type { TModalPresence } from "./modal-hub.types";

export const modalBGTransitions: TModalPresence = {
  key: "modal-bg",
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const modalTransitions: TModalPresence = {
  key: "modal",
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
};
