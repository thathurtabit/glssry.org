import type { FC } from "react";

import { GoNumber } from "react-icons/go";
import type { IconBaseProps } from "react-icons/lib";

export const IconNumber: FC<IconBaseProps> = (properties) => (
  <GoNumber {...properties} />
);
