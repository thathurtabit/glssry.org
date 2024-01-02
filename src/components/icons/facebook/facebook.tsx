import type { FC } from "react";

import { FaFacebook } from "react-icons/fa";
import type { IconBaseProps } from "react-icons/lib";

export const IconFacebook: FC<IconBaseProps> = (properties) => (
  <FaFacebook {...properties} />
);
