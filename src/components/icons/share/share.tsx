import type { FC } from "react";

import { FiShare2 } from "react-icons/fi";
import type { IconBaseProps } from "react-icons/lib";

export const IconShare: FC<IconBaseProps> = (properties) => (
  <FiShare2 {...properties} />
);
