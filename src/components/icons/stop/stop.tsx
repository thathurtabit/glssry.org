import type { FC } from "react";

import { BsFillStopFill } from "react-icons/bs";
import type { IconBaseProps } from "react-icons/lib";

export const IconStop: FC<IconBaseProps> = (properties) => (
  <BsFillStopFill {...properties} />
);
