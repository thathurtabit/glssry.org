import type { FC } from "react";
import { IconInfo } from "~/components/icons/info/info";
import { appDescription, appTitle } from "~/settings/constants";

export const Intro: FC = () => (
  <section className="flex flex-col md:flex-row mb-8 md:mb-0- justify-center items-start gap-3 md:gap-5">
    <IconInfo size={18} className="relative top-1" />
    <p className="text-lg md:text-xl w-full max-w-lg font-sub-heading">
      <strong className="font-bold">{appTitle}.org</strong> {appDescription}
    </p>
  </section>
);
