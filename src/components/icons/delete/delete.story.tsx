import type { Meta, StoryObj } from "@storybook/react";

import { IconDelete } from "./delete";

const meta: Meta<typeof IconDelete> = {
  title: "Icons/Icon Delete",
  component: IconDelete,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconDelete>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
