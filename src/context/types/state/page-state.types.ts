import type { ReactElement } from "react";
import type { TButtonVariant } from "~/types/common.types";

export interface IPageState {
  isMenuOpen: boolean;
  modal: IModalData;
}

export interface IModalFooterAction {
  onClick: () => void;
  loading?: boolean;
  text?: string;
  icon?: ReactElement;
  variant?: TButtonVariant;
}

export interface IModalFooter {
  confirm?: IModalFooterAction
  cancel?: IModalFooterAction
}

export interface IModalData {
  title: string | null;
  preTitle?: string | null;
  type: "small" | "medium" | "large" | null;
  background?: "light" | "dark";
  content: ReactElement | null;
  footer?: IModalFooter | null;
}
