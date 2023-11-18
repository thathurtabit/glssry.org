import { Fragment } from "react";
import {
  Nunito_Sans as nunitoSansFont,
  Roboto_Serif as robotoSerifFont,
} from "next/font/google";
import type { FCC } from "~/types/react.types";

const heading = robotoSerifFont({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-heading",
});

const body = nunitoSansFont({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-body",
});

export const AppWrapper: FCC = ({ children }) => (
  <Fragment>
    {/* https://nextjs.org/blog/styling-next-with-styled-jsx#adding-global-styles */}
    {/* eslint-disable-next-line react/no-unknown-property */}
    <style jsx global>
      {`
        :root {
          --font-heading: ${heading.style.fontFamily};
          --font-body: ${body.style.fontFamily};
        }
      `}
    </style>
    <div
      className={`flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-background font-body ${body.variable} ${heading.variable}`}
    >
      {children}
    </div>
  </Fragment>
);
