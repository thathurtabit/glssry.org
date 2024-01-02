import type { Meta, StoryObj } from "@storybook/react";

import { PageIntro } from "./page-intro";

const meta: Meta<typeof PageIntro> = {
  title: "Atoms/Page Intro",
  component: PageIntro,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageIntro>;

export const Default: Story = {
  ...meta,
  args: {
    textList: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      "sed do eiusmod tempor incididunt ut labore et",
    ],
  },
};
