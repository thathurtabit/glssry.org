import type { FC } from "react";

import { LinkText } from "~/components/atoms/link-text/link-text";
import { EURLS } from "~/settings/constants";

export const FooterStrip: FC = () => {
  const footerData: { title: string; link: string }[] = [
    {
      title: "About",
      link: EURLS.About,
    },
    {
      title: "Contribute",
      link: EURLS.Contribute,
    },
    {
      title: "Terms",
      link: EURLS.Terms,
    },
    {
      title: "Privacy",
      link: EURLS.Privacy,
    },
    {
      title: "Nuke",
      link: EURLS.Nuke,
    },
  ];
  return (
    <nav className="flex gap-5 p-5 justify-center md:justify-end">
      {footerData.map(({ link, title }) => (
        <LinkText
          key={link}
          className="text-[0.5rem] tracking-widest opacity-50 uppercase"
          href={link}
        >
          {title}
        </LinkText>
      ))}
    </nav>
  );
};
