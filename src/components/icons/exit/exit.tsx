import type { FC } from "react";

import type { IconBaseProps } from "react-icons/lib";
import { MdOutlineExitToApp } from "react-icons/md";

export const IconExit: FC<IconBaseProps> = (properties) => (
  <MdOutlineExitToApp {...properties} />
);
