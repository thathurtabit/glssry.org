import type { FCC } from "~/types/react.types";

import type { ISectionTitle } from "./section-title.types";

export const SectionTitle: FCC<ISectionTitle> = ({
  children,
  noMargin,
  className,
  headingLevel = "h2",
}) => {
  const HeadingTag = headingLevel;
  return (
    <HeadingTag
      className={`${noMargin ? "" : "mb-4"} text-3xl text-copy ${
        className ?? ""
      }`}
    >
      {children}
    </HeadingTag>
  );
};
