import type { FC } from "react";

import { CgExternal } from "react-icons/cg";
import type { IconBaseProps } from "react-icons/lib";

export const IconExternalLink: FC<IconBaseProps> = (properties) => (
  <CgExternal {...properties} />
);
