import type { FC } from "react";
import type { ISharedHead } from "./shared-head.types";
import Head from "next/head";
import { appDescription, appTitle } from "~/settings/constants";

export const SharedHead: FC<ISharedHead> = ({ title, description }) => {
  const pageTitle = title ?? appTitle;
  const pageDescription = description ?? appDescription;
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
