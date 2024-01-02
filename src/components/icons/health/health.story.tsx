import type { Meta, StoryObj } from "@storybook/react";

import { IconHealth } from "./health";

const meta: Meta<typeof IconHealth> = {
  title: "Icons/Icon Health",
  component: IconHealth,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconHealth>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
