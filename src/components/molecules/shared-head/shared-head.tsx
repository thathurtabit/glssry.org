import type { FC } from "react";
import type { ISharedHead } from "./shared-head.types";
import Head from "next/head";
import { appDescription, appTitle } from "~/settings/constants";
import { useRouterEvent } from "~/hooks/page/use-router-event.hook";
import { useKeyboardEvents } from "~/hooks/page/use-keyboard-events.hook";
import { usePathname } from "next/navigation";

export const SharedHead: FC<ISharedHead> = ({ title, description }) => {
  const pathname = usePathname();
  useRouterEvent();
  useKeyboardEvents();
  const isHomepage = pathname === "/";
  const pageTitle = title ?? appTitle;
  const pageDescription = description ?? appDescription;
  return (
    <Head>
      <title>{isHomepage ? pageTitle : `${pageTitle} | ${appTitle}`}</title>
      <meta name="description" content={pageDescription} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
