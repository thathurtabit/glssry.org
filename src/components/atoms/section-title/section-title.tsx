import type { FCC } from "~/types/react.types";
import type { ISectionTitle } from "./section-title.types";

export const SectionTitle: FCC<ISectionTitle> = ({
  children,
  noMargin,
  className,
}) => (
  <h3 className={`${noMargin ? "" : "mb-4"} text-3xl ${className ?? ""}`}>
    {children}
  </h3>
);