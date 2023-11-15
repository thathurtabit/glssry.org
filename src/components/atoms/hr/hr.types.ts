import type { HTMLAttributes } from "react";

export interface IHR extends HTMLAttributes<HTMLHRElement> {
  inverse?: boolean;
  position?: "left" | "center" | "right";
}
