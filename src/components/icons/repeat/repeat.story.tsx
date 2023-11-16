import type { Meta, StoryObj } from "@storybook/react";
import { IconRepeat } from "./repeat";

const meta: Meta<typeof IconRepeat> = {
  title: "Icons/Icon Repeat",
  component: IconRepeat,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconRepeat>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
