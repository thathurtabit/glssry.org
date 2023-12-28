import type { HTMLAttributes } from "react";

export interface ISectionSubtitle extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  noMargin?: boolean;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
