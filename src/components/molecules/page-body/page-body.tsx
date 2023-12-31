import type { FCC } from "~/types/react.types";

export const PageBody: FCC = ({ children }) => (
  <section className="flex flex-1 flex-col items-start pb-4">
    {children}
  </section>
);
