import type { Meta, StoryObj } from "@storybook/react";

import { IconCurrency } from "./currency";

const meta: Meta<typeof IconCurrency> = {
  title: "Icons/Icon Currency",
  component: IconCurrency,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconCurrency>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
