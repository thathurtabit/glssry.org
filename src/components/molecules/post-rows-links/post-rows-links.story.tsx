import type { Meta, StoryObj } from "@storybook/react";
import { PostRowsLinks } from "./post-rows-links";
import { postsLinksMockData } from "~/data/posts.mock-data";

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
