import type { Meta, StoryObj } from "@storybook/react";

import { IconConfirm } from "./confirm";

const meta: Meta<typeof IconConfirm> = {
  title: "Icons/Icon Confirm",
  component: IconConfirm,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconConfirm>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
