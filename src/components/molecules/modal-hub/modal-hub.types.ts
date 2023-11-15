import type { IAnimatePresence } from "./../../atoms/motion-presence/motion-presence.types";

export type TModalPresence = Omit<IAnimatePresence, "isActive" | "motionKey"> & {
  key: string;
}
