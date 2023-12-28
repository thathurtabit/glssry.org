import type { FCC } from "~/types/react.types";
import type { ISectionSubtitle } from "./section-subtitle.types";

export const SectionSubtitle: FCC<ISectionSubtitle> = ({
  children,
  className,
  noMargin,
  headingLevel = "h3",
}) => {
  const HeadingTag = headingLevel;
  return (
    <HeadingTag
      className={`${
        noMargin ? "" : "mb-5"
      } font-body font-medium uppercase opacity-50 tracking-wide ${
        className ?? ""
      }`}
    >
      {children}
    </HeadingTag>
  );
};
