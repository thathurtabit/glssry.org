import type { FCC } from "~/types/react.types";
import type { IPageContent } from "./page-content.types";
import { motion } from "framer-motion";
import { animateDefaults } from "~/components/atoms/motion-presence/motion-presence.defaults";

export const PageContent: FCC<IPageContent> = ({
  children,
  width = "full",
}) => (
  <motion.article
    {...animateDefaults}
    className={`container relative z-1 mt-3 flex w-full flex-col gap-2 ${
      width === "full" ? "max-w-5xl" : "max-w-2xl"
    }`}
  >
    {children}
  </motion.article>
);
