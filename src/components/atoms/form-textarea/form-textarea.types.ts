import type { InputHTMLAttributes } from "react";
import type { TInputSize, TInputWidth } from "~/types/common.types";

export interface IFormTextarea extends InputHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  description?: string;
  width?: TInputWidth;
  hasError: boolean;
  inverse?: boolean;
  inputSize?: TInputSize;
  errorText?: string | string[];
  rows?: number;
  maxCharacterCount?: number;
}
