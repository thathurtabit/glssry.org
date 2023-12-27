import type { FCC } from "~/types/react.types";
import type { ISectionSubtitle } from "./section-subtitle.types";

export const SectionSubtitle: FCC<ISectionSubtitle> = ({
  children,
  className,
  noMargin,
}) => (
  <h4
    className={`${
      noMargin ? "" : "mb-5"
    } font-body font-medium uppercase opacity-50 tracking-wide ${
      className ?? ""
    }`}
  >
    {children}
  </h4>
);
