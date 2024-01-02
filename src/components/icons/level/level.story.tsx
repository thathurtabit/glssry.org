import type { Meta, StoryObj } from "@storybook/react";

import { IconLevel } from "./level";

const meta: Meta<typeof IconLevel> = {
  title: "Icons/Icon Level",
  component: IconLevel,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconLevel>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
