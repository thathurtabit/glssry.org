import type { FC } from "react";
import type { IconBaseProps } from "react-icons/lib";
import { LuTimerReset } from "react-icons/lu";

export const IconReset: FC<IconBaseProps> = (properties) => (
  <LuTimerReset {...properties} />
);
