import type { Meta, StoryObj } from "@storybook/react";

import { IconGoForward } from "./go-forward";

const meta: Meta<typeof IconGoForward> = {
  title: "Icons/Icon Go Forward",
  component: IconGoForward,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconGoForward>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
