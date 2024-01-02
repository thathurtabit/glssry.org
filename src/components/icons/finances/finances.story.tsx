import type { Meta, StoryObj } from "@storybook/react";

import { IconFinances } from "./finances";

const meta: Meta<typeof IconFinances> = {
  title: "Icons/Icon Finances",
  component: IconFinances,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconFinances>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
