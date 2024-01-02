import type { Meta, StoryObj } from "@storybook/react";

import { IconShare } from "./share";

const meta: Meta<typeof IconShare> = {
  title: "Icons/Icon Share",
  component: IconShare,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconShare>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
