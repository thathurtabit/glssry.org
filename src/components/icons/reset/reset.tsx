import type { FC } from "react";
import type { IconBaseProps } from "react-icons/lib";
import { GrPowerReset } from "react-icons/gr";

export const IconReset: FC<IconBaseProps> = (properties) => (
  <GrPowerReset {...properties} />
);
