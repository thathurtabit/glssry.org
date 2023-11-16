import React from "react";
import type { FC } from "react";
import type { IPalette } from "./palette.types";

export const Palette: FC<IPalette> = ({ styles, isToken = true }) => (
  <section
    className={`flex flex-col p-20 w-full items-center justify-center ${styles} ${
      isToken ? "is-token" : ""
    }`}
  >
    <strong>Class names:</strong> {styles}
  </section>
);
