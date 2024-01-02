import type { Meta, StoryObj } from "@storybook/react";

import { PostShortLoading } from "./post-short-loading";

const meta: Meta<typeof PostShortLoading> = {
  title: "Molecules/Post Short Loading",
  component: PostShortLoading,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostShortLoading>;

export const Default: Story = {
  ...meta,
  args: {},
};
