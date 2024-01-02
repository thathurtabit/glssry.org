import type { Meta, StoryObj } from "@storybook/react";

import { IconLoading } from "./loading";

const meta: Meta<typeof IconLoading> = {
  title: "Icons/Icon Loading",
  component: IconLoading,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconLoading>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
