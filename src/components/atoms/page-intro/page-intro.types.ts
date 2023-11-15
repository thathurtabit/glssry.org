import type { ReactNode } from "react";
import type { IHR } from "../hr/hr.types";
export interface IPageIntro {
  textList: (string | ReactNode)[];
  hrProps?: IHR;
  showHR?: boolean;
}
