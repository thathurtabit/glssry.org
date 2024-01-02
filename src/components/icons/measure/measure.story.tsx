import type { Meta, StoryObj } from "@storybook/react";

import { IconMeasure } from "./measure";

const meta: Meta<typeof IconMeasure> = {
  title: "Icons/Icon Measure",
  component: IconMeasure,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconMeasure>;

export const Default: Story = { args: { size: "2rem" } };
