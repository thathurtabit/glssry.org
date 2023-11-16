import type { HTMLAttributes } from "react";

export interface ISectionSubtitle extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  noMargin?: boolean;
}
