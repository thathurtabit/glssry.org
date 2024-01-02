import type { ReactNode } from "react";

import type { IHR } from "../horizontal-rule/horizontal-rule.types";
export interface IPageIntro {
  textList: (string | ReactNode)[];
  hrProps?: IHR;
  showHR?: boolean;
}
