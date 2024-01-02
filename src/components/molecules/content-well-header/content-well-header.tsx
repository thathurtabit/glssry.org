import type { FC } from "react";

import type { IContentWellHeader } from "./content-well-header.types";

export const preTitleStyles = "font-medium opacity-70";
export const titleStyles = "font-semibold uppercase tracking-wide";

export const ContentWellHeader: FC<IContentWellHeader> = ({ text, span }) => (
  <h2 className="px-5 py-3 font-sub-heading rounded-t-lg text-center text-sm">
    {span && <span className={preTitleStyles}>{span} </span>}
    <span className={titleStyles}>{text}</span>
  </h2>
);
