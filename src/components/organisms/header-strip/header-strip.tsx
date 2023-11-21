import type { FC } from "react";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { IconMenu } from "~/components/icons/menu/menu";
import { EURLS, appTitle } from "~/settings/constants";

export const HeaderStrip: FC = () => (
  <section className="fixed top-0 left-0 right-0 flex justify-between py-3 px-5  text-white border-b-[1px] border-white/10">
    <LinkText href={EURLS.Home} className="font-heading text-lg">
      {appTitle}
    </LinkText>
    <div>
      <IconMenu />
    </div>
  </section>
);
