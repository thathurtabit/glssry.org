import type { ButtonHTMLAttributes } from "react";

export interface IButtonText extends ButtonHTMLAttributes<HTMLButtonElement> {
  inverse?: boolean;
}
