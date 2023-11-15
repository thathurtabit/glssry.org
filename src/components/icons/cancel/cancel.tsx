import type { FC } from "react";
import type { IconBaseProps } from "react-icons/lib";
import { MdOutlineClose } from "react-icons/md";

export const IconCancel: FC<IconBaseProps> = (properties) => <MdOutlineClose {...properties} />;
