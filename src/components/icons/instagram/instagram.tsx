import type { FC } from "react";

import { GrInstagram } from "react-icons/gr";
import type { IconBaseProps } from "react-icons/lib";

export const IconInstagram: FC<IconBaseProps> = (properties) => (
  <GrInstagram {...properties} />
);
