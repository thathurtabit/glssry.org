import type { Meta, StoryObj } from "@storybook/react";
import { IconMinus } from "./minus";

const meta: Meta<typeof IconMinus> = {
  title: "Icons/Icon Minus",
  component: IconMinus,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconMinus>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
