import type { Meta, StoryObj } from "@storybook/react";

import { IconGoUp } from "./go-up";

const meta: Meta<typeof IconGoUp> = {
  title: "Icons/Icon Go Up",
  component: IconGoUp,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconGoUp>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
