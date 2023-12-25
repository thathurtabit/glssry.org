import type { Meta, StoryObj } from "@storybook/react";
import { PostShort } from "./post-short";

const meta: Meta<typeof PostShort> = {
  title: "Molecules/Post Short",
  component: PostShort,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostShort>;

export const Default: Story = {
  ...meta,
  args: {
    isLoading: false,
  },
};
