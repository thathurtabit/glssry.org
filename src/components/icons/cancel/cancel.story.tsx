import type { Meta, StoryObj } from "@storybook/react";

import { IconCancel } from "./cancel";

const meta: Meta<typeof IconCancel> = {
  title: "Icons/Icon Cancel",
  component: IconCancel,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconCancel>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
