import type { Meta, StoryObj } from "@storybook/react";
import { IconPlus } from "./plus";

const meta: Meta<typeof IconPlus> = {
  title: "Icons/Icon Plus",
  component: IconPlus,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconPlus>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
