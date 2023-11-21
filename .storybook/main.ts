import type { StorybookConfig } from "@storybook/nextjs";
import path from "node:path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", '../src/**/*.story.mdx',
    '../src/**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    '@tomfreudenberg/next-auth-mock/storybook'
  ],
  async webpackFinal(config) {
    if (!config?.resolve?.alias) {
      return config;
    }

    if (!config?.resolve?.extensions) {
      return config;
    }

    config.module?.rules?.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
    });

    config.resolve.alias = {
      ...config.resolve?.alias,
      "~": path.resolve(__dirname, "../src/"),
    };
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  docs: {
    autodocs: true,
  },
};
export default config;
