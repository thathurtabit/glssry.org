import type { ButtonHTMLAttributes } from "react";

import type { IModalData } from "~/context/types/state/page-state.types";

export interface IModalInfoButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  modalData?: IModalData;
}
