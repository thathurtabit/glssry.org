import type { FCC } from "~/types/react.types";
import type { IPageContent } from "./page-content.types";

export const PageContent: FCC<IPageContent> = ({ children, width = "full" }) => (
  <article
    className={`relative md:container md:mx-auto z-1 mt-3 flex w-full flex-col gap-2 ${
      width === "full" ? "max-w-5xl" : "max-w-2xl"
    }`}
  >
    {children}
  </article>
);
