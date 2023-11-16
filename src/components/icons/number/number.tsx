import type { FC } from "react";
import type { IconBaseProps } from "react-icons/lib";
import { GoNumber } from "react-icons/go";

export const IconNumber: FC<IconBaseProps> = (properties) => (
  <GoNumber {...properties} />
);
