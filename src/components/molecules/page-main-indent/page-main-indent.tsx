import React from "react";
import type { FCC } from "~/types/react.types";

export const PageMainIndent: FCC = ({ children }) => (
  <div className="container max-w-2xl">{children}</div>
);
