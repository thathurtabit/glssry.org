import type { Meta, StoryObj } from "@storybook/react";

import { postsFullMockData } from "~/data/posts.mock-data";

import { PostRowsButtons } from "./post-rows-buttons";

const meta: Meta<typeof PostRowsButtons> = {
  title: "Molecules/Post Rows Buttons",
  component: PostRowsButtons,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostRowsButtons>;

export const Default: Story = {
  ...meta,
  args: {
    postsData: postsFullMockData,
  },
};
