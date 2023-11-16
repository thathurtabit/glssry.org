import type { AnchorHTMLAttributes } from "react";

export interface ILinkText extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  inverse?: boolean;
}
