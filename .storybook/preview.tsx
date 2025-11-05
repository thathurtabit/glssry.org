import React from "react";
import type { Preview } from "@storybook/react";
import { ComponentType } from "react";
import { GlssryAppProvider } from "../src/context/context/context";
import "../src/styles/globals.css";
import {
  Abril_Fatface as abrilFont,
  Comfortaa as comfortaaFont,
  Nunito_Sans as nunitoSansFont,
} from "next/font/google";

const heading = abrilFont({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

const subHeading = comfortaaFont({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sub-heading",
});

const body = nunitoSansFont({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-body",
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: ComponentType<object>, context) => (
      <GlssryAppProvider>
        {/* https://nextjs.org/blog/styling-next-with-styled-jsx#adding-global-styles */}
        { }
        <style>
          {`
                :root {
                  --font-heading: ${heading.style.fontFamily};
                  --font-sub-heading: ${subHeading.style.fontFamily};
                  --font-body: ${body.style.fontFamily};
                }
              `}
        </style>
        <div
          className={`flex flex-col text-white items-center justify-center overflow-x-hidden ${
            context.parameters.inverse ? "bg-white" : "bg-background"
          }`}
        >
          <Story />
        </div>
      </GlssryAppProvider>
    ),
  ],
};

export default preview;
