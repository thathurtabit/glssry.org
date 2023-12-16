import type { Meta, StoryObj } from "@storybook/react";
import { PostRowsLoading } from "./post-rows-loading";

const meta: Meta<typeof PostRowsLoading> = {
  title: "Molecules/Post Rows Loading",
  component: PostRowsLoading,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostRowsLoading>;

export const Default: Story = {
  ...meta,
  args: {},
};
