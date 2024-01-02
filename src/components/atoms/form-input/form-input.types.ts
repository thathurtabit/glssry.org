import type { ComponentType, InputHTMLAttributes } from "react";

import type { IconBaseProps } from "react-icons";

import type { IModalData } from "~/context/types/state/page-state.types";
import type { TInputSize, TInputWidth } from "~/types/common.types";

import type { IButton } from "../button/button.types";

export interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  description?: string;
  width?: TInputWidth;
  hasError: boolean;
  inverse?: boolean;
  prefix?: string;
  inputSize?: TInputSize;
  errorText?: string | string[];
  isTypeAheadOpen?: boolean;
  submitButtonData?: IButton;
  modalData?: IModalData;
  Icon?: ComponentType<IconBaseProps>;
}
