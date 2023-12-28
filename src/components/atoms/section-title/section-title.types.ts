import type { HTMLAttributes } from "react";

export interface ISectionTitle extends HTMLAttributes<HTMLHeadingElement> {
  noMargin?: boolean;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
