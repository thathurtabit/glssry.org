import type { FC } from "react";
import type { IconBaseProps } from "react-icons/lib";
import { BiMessageRoundedError } from "react-icons/bi";

export const IconWarning: FC<IconBaseProps> = (properties) => <BiMessageRoundedError {...properties} />;
