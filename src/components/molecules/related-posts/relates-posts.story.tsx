import type { Meta, StoryObj } from "@storybook/react";

import { RelatedPosts } from "./related-posts";

const meta: Meta<typeof RelatedPosts> = {
  title: "Molecules/Related Posts",
  component: RelatedPosts,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RelatedPosts>;

export const Default: Story = {
  ...meta,
  args: {},
};
