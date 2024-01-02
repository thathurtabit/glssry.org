import type { Meta, StoryObj } from "@storybook/react";

import { postsLinksMockData } from "~/data/posts.mock-data";

import { PostRowsLinks } from "./post-rows-links";

const meta: Meta<typeof PostRowsLinks> = {
  title: "Molecules/Post Rows Links",
  component: PostRowsLinks,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostRowsLinks>;

export const Default: Story = {
  ...meta,
  args: {
    postsData: postsLinksMockData,
  },
};
