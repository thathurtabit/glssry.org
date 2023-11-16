import type { Meta, StoryObj } from "@storybook/react";
import { IconThink } from "./think";

const meta: Meta<typeof IconThink> = {
  title: "Icons/Icon Think",
  component: IconThink,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconThink>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
