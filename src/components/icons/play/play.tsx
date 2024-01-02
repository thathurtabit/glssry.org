import type { FC } from "react";

import { BsFillPlayFill } from "react-icons/bs";
import type { IconBaseProps } from "react-icons/lib";

export const IconPlay: FC<IconBaseProps> = (properties) => (
  <BsFillPlayFill {...properties} />
);
