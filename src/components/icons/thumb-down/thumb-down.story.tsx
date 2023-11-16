import type { Meta, StoryObj } from "@storybook/react";
import { IconThumbDown } from "./thumb-down";

const meta: Meta<typeof IconThumbDown> = {
  title: "Icons/Icon Thumb Down",
  component: IconThumbDown,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconThumbDown>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
