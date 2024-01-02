import type { Meta, StoryObj } from "@storybook/react";

import { Share } from "./share";

const meta: Meta<typeof Share> = {
  title: "Atoms/Share",
  component: Share,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Share>;

export const Default: Story = {
  ...meta,
  args: { title: "My Post", text: "Some text about this post" },
};
