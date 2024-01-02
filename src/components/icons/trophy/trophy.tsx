import type { FC } from "react";

import { LiaTrophySolid } from "react-icons/lia";
import type { IconBaseProps } from "react-icons/lib";

export const IconTrophy: FC<IconBaseProps> = (properties) => (
  <LiaTrophySolid {...properties} />
);
