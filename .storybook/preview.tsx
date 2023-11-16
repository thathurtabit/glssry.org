import React from "react";
import type { Preview } from "@storybook/react";
import { ComponentType } from "react";
import { GlssryAppProvider } from "../src/context/context/context";
import { themes } from "@storybook/theming";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      // Override the default dark theme
      dark: { ...themes.dark, appBg: "black" },
    },
  },
  decorators: [
    (Story: ComponentType<object>, context) =>
      context.args.isToken ? (
        <Story />
      ) : (
        <GlssryAppProvider>
          <div
            className={`flex h-screen flex-col text-white items-center justify-center overflow-x-hidden bg-background`}
          >
            <Story />
          </div>
        </GlssryAppProvider>
      ),
  ],
};

export default preview;
