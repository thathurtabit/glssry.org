import type { Meta, StoryObj } from "@storybook/react";

import { IconGoogle } from "./google";

const meta: Meta<typeof IconGoogle> = {
  title: "Icons/Icon Google",
  component: IconGoogle,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconGoogle>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
