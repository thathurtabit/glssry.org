import type { FCC } from "~/types/react.types";
import type { ISectionTitle } from "./section-title.types";

export const SectionTitle: FCC<ISectionTitle> = ({
  children,
  noMargin,
  className,
}) => (
  <h2
    className={`${noMargin ? "" : "mb-4"} text-3xl text-copy ${
      className ?? ""
    }`}
  >
    {children}
  </h2>
);
