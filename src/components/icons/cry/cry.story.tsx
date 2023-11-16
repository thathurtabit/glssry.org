import type { Meta, StoryObj } from "@storybook/react";
import { IconCry } from "./cry";

const meta: Meta<typeof IconCry> = {
  title: "Icons/Icon Cry",
  component: IconCry,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconCry>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
