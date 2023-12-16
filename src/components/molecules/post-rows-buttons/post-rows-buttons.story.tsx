import type { Meta, StoryObj } from "@storybook/react";
import { PostRowsButtons } from "./post-rows-buttons";
import { postsFullMockData } from "~/data/posts.mock-data";

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
