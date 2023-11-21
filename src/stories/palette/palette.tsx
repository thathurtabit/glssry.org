import React from "react";
import type { FC } from "react";
import type { IPalette } from "./palette.types";

export const Palette: FC<IPalette> = ({ styles = true }) => (
  <section
    className={`flex flex-col p-20 w-full items-center justify-center ${styles}`}
  >
    <strong>Class names:</strong> {styles}
  </section>
);
