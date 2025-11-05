import { Fragment } from "react";
import type { FC } from "react";

import type { IPageHeader } from "./page-header.types";

export const PageHeader: FC<IPageHeader> = ({
  text,
  preText,
  TitleIcon,
  removeMargin = false,
}) => (
  <Fragment>
    {preText && (
      <p className="text-xs uppercase tracking-widest text-copy m-0">
        {preText}
      </p>
    )}
    <h1
      className={`font-heading drop-shadow-headers flex gap-2 text-4xl md:text-5xl ${
        removeMargin ? "m-0" : "mb-3"
      } ${preText ? "mt-1" : "mt-4"}`}
    >
      {text} {TitleIcon ? <TitleIcon /> : null}
    </h1>
  </Fragment>
);
