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
      <p className="text-xs uppercase tracking-widest font-semibold text-copy m-0">
        {preText}
      </p>
    )}
    <h1
      className={`font-body drop-shadow-headers leading-7 flex gap-2 text-4xl md:text-5xl font-extrabold uppercase ${
        removeMargin ? "m-0" : "mb-3"
      } ${preText ? "mt-1" : "mt-4"}`}
    >
      {text} {TitleIcon ? <TitleIcon /> : null}
    </h1>
  </Fragment>
);
