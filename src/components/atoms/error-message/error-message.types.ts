import type { ComponentType } from "react";
import type { IconBaseProps } from "react-icons";

export interface IErrorMessage {
  title: string;
  text: string;
  className?: string;
  Icon?: ComponentType<IconBaseProps>;
}
