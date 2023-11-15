import type { AnchorHTMLAttributes } from "react";
import type { TButtonVariant } from "~/types/common.types";

export interface ILink extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  title?: string;
  size?: "small" | "medium" | "large";
  variant?: TButtonVariant;
  direction?: "next" | "prev";
  iconOnly?: boolean;
}
