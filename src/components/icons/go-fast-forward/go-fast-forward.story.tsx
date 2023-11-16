import type { Meta, StoryObj } from "@storybook/react";
import { IconGoFastForward } from "./go-fast-forward";

const meta: Meta<typeof IconGoFastForward> = {
  title: "Icons/Icon Go Fast Forward",
  component: IconGoFastForward,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconGoFastForward>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
