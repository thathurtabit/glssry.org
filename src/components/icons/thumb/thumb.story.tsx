import type { Meta, StoryObj } from "@storybook/react";
import { IconThumb } from "./thumb";

const meta: Meta<typeof IconThumb> = {
  title: "Icons/Icon Thumb",
  component: IconThumb,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconThumb>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
