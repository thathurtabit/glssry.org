import type { FC } from "react";

import { BiStopwatch } from "react-icons/bi";
import type { IconBaseProps } from "react-icons/lib";

export const IconStopwatch: FC<IconBaseProps> = (properties) => (
  <BiStopwatch {...properties} />
);
