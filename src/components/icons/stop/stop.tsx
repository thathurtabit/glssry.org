import type { FC } from "react";
import type { IconBaseProps } from "react-icons/lib";
import { BsFillStopFill } from "react-icons/bs";

export const IconStop: FC<IconBaseProps> = (properties) => (
  <BsFillStopFill {...properties} />
);
