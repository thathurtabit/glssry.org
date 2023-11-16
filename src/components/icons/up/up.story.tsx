import type { Meta, StoryObj } from "@storybook/react";
import { IconUp } from "./up";

const meta: Meta<typeof IconUp> = {
  title: "Icons/Icon Up",
  component: IconUp,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconUp>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
