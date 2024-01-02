import type { FC } from "react";

import { BiCheck } from "react-icons/bi";
import type { IconBaseProps } from "react-icons/lib";

export const IconConfirm: FC<IconBaseProps> = (properties) => <BiCheck {...properties} />;
