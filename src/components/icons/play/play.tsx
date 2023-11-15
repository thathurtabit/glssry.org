import type { FC } from "react";
import type { IconBaseProps } from "react-icons/lib";
import { BsFillPlayFill } from "react-icons/bs";

export const IconPlay: FC<IconBaseProps> = (properties) => (
  <BsFillPlayFill {...properties} />
);
