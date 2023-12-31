import React from "react";

import type { FCC } from "~/types/react.types";

import type { IPageMainIndent } from "./page-main-indent.types";

export const PageMainIndent: FCC<IPageMainIndent> = ({
  children,
  className = "max-w-2xl",
}) => <div className={`flex-1 w-full md:mx-auto ${className}`}>{children}</div>;
