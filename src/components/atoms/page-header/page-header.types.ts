import type { ComponentType } from "react";
import type { IconBaseProps } from "react-icons";

export interface IPageHeader {
  text: string
  TitleIcon?: ComponentType<IconBaseProps>;
  preText?: string
  removeMargin?: boolean
}
