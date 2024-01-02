import type { FC } from "react";

import type { IconBaseProps } from "react-icons/lib";
import { TfiThumbDown } from "react-icons/tfi";

export const IconThumbDown: FC<IconBaseProps> = (properties) => (
  <TfiThumbDown {...properties} />
);
