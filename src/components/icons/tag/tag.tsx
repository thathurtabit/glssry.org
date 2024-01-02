import type { FC } from "react";

import { AiOutlineTag } from "react-icons/ai";
import type { IconBaseProps } from "react-icons/lib";

export const IconTag: FC<IconBaseProps> = (properties) => (
  <AiOutlineTag {...properties} />
);
