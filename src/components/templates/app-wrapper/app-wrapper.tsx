import { Fragment } from "react";
import type { FCC } from "~/types/react.types";
import {
  Abril_Fatface as abrilFont,
  Comfortaa as comfortaaFont,
  Nunito_Sans as nunitoSansFont,
} from "next/font/google";
import { HeaderStrip } from "~/components/organisms/header-strip/header-strip";

const heading = abrilFont({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

const subHeading = comfortaaFont({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sub-heading",
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
          --font-sub-heading: ${subHeading.style.fontFamily};
          --font-body: ${body.style.fontFamily};
        }
      `}
    </style>
    <div
      className={`flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-background ${heading.variable} ${subHeading.variable} ${body.variable}`}
    >
      <HeaderStrip />
      {children}
    </div>
  </Fragment>
);
