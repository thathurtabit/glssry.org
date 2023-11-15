import type { IconBaseProps } from "react-icons";
import type { TInfoTypes } from "~/types/common.types";

export interface IInfoIcon extends IconBaseProps {
  type: TInfoTypes;
  className: string;
}
