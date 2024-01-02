import type { Meta, StoryObj } from "@storybook/react";

import { IconStopwatch } from "./stopwatch";

const meta: Meta<typeof IconStopwatch> = {
  title: "Icons/Icon Stopwatch",
  component: IconStopwatch,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconStopwatch>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
