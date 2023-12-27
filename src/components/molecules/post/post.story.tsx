import type { Meta, StoryObj } from "@storybook/react";
import { Post } from "./post";

const meta: Meta<typeof Post> = {
  title: "Molecules/Post",
  component: Post,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Post>;

export const Default: Story = {
  ...meta,
  args: {
    postData: {
      author: {
        id: "john-doe-1",
        username: "john-doe-1",
        image: "https://i.pravatar.cc/300?img=1",
      },
      slug: "my-first-post",
      abbreviation: "MFP",
      acronym: "MFP",
      initialism: "MFP",
      authorId: "john-doe-1",
      createdAt: new Date(),
      id: "post-1",
      title: "My first post",
      versions: [],
    },
  },
};
