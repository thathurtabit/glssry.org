import type { FC } from "react";
import type { IconBaseProps } from "react-icons/lib";
import { LiaTrophySolid } from "react-icons/lia";

export const IconTrophy: FC<IconBaseProps> = (properties) => (
  <LiaTrophySolid {...properties} />
);
