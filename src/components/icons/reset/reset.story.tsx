import type { Meta, StoryObj } from "@storybook/react";
import { IconReset } from "./reset";

const meta: Meta<typeof IconReset> = {
  title: "Icons/Icon Reset",
  component: IconReset,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconReset>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
