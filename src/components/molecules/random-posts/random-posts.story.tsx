import type { Meta, StoryObj } from "@storybook/react";

import { RandomPosts } from "./random-posts";

const meta: Meta<typeof RandomPosts> = {
  title: "Molecules/Random Posts",
  component: RandomPosts,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RandomPosts>;

export const Default: Story = {
  ...meta,
  args: {},
};
