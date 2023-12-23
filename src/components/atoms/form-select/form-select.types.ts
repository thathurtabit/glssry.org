import type { InputHTMLAttributes } from "react";
import type { IModalData } from "~/context/types/state/page-state.types";
import type { TInputSize, TInputWidth } from "~/types/common.types";

export interface IFormSelect extends InputHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  description?: string;
  width?: TInputWidth;
  hasError: boolean;
  inverse?: boolean;
  inputSize?: TInputSize;
  errorText?: string | string[];
  optionList: string[];
  modalData?: IModalData;
}
