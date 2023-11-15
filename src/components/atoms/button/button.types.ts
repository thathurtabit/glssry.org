import type { ButtonHTMLAttributes } from "react";
import type { TButtonVariant } from "~/types/common.types";

export type TButtonSize = "small" | "medium" | "large";
export type TButtonShape = "lozenge" | "round";
export type TButtonDirection = "next" | "prev";
export type TButtonControl = "play" | "stop" | "reset"

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  size?: TButtonSize;
  shape?: TButtonShape;
  variant?: TButtonVariant;
  loading?: boolean;
  direction?: TButtonDirection;
  control?: TButtonControl;
  hasError?: boolean;
  iconOnly?: boolean;
  errorText?: string;
}
