import type { Meta, StoryObj } from "@storybook/react";

import { IconReply } from "./reply";

const meta: Meta<typeof IconReply> = {
  title: "Icons/Icon Reply",
  component: IconReply,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconReply>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
