import type { FC } from "react";

import { GrPowerReset } from "react-icons/gr";
import type { IconBaseProps } from "react-icons/lib";

export const IconReset: FC<IconBaseProps> = (properties) => (
  <GrPowerReset {...properties} />
);
