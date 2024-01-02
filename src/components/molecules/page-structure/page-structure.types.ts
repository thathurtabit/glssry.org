import type { ComponentType } from "react";

import type { IconBaseProps } from "react-icons";

import type { TJustifyContent } from "~/types/common.types";

import type { TPageContentWidth } from "../page-content/page-content.types";

export interface IPageStructure {
  preTitle?: string;
  title: string;
  TitleIcon?: ComponentType<IconBaseProps>;
  showTitle?: boolean;
  requiresAuthentication?: boolean;
  justifyContent?: TJustifyContent;
  width?: TPageContentWidth;
  removeHeaderMargin?: boolean;
  isLoading?: boolean;
}
