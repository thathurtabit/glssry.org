import type { FC } from "react";
import type { ISharedHead } from "./shared-head.types";
import Head from "next/head";
import { appDescription, appTitle } from "~/settings/constants";
import { useRouterEvent } from "~/hooks/page/use-router-event.hook";
import { useKeyboardEvents } from "~/hooks/page/use-keyboard-events.hook";
import { usePathname } from "next/navigation";

export const SharedHead: FC<ISharedHead> = ({ title, description }) => {
  const pathname = usePathname();
  useRouterEvent({});
  useKeyboardEvents();
  const isHomepage = pathname === "/";
  const pageTitle = title ?? appTitle;
  const pageDescription = description ?? `${appTitle} ${appDescription}`;
  return (
    <Head>
      <title>{isHomepage ? pageTitle : `${pageTitle} | ${appTitle}`}</title>
      <meta name="description" content={pageDescription} />
      <link rel="icon" href="/favicon/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
    </Head>
  );
};
