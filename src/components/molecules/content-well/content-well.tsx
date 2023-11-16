import type { FCC } from "~/types/react.types";
import type { IContentWell } from "./content-well.types";

export const ContentWell: FCC<IContentWell> = ({
  children,
  additionalClass = "max-w-sm",
}) => (
  <section
    data-testid="content-well"
    className={`w-full rounded-md bg-secondary-light py-5 px-5 text-copy ${additionalClass}`}
  >
    {children}
  </section>
);
