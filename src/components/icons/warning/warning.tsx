import type { FC } from "react";

import { BiMessageRoundedError } from "react-icons/bi";
import type { IconBaseProps } from "react-icons/lib";

export const IconWarning: FC<IconBaseProps> = (properties) => <BiMessageRoundedError {...properties} />;
