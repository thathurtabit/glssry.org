import type { FC } from "react";
import { IconMenu } from "~/components/icons/menu/menu";
import { appTitle } from "~/settings/constants";

export const HeaderStrip: FC = () => (
  <section className="fixed top-0 left-0 right-0 flex justify-between py-3 px-5  text-white border-b-[1px] border-white/10">
    <span className="font-heading text-lg">{appTitle}</span>
    <div>
      <IconMenu />
    </div>
  </section>
);
