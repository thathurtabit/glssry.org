import type { Meta, StoryObj } from "@storybook/react";
import { IconTrophy } from "./trophy";

const meta: Meta<typeof IconTrophy> = {
  title: "Icons/Icon Trophy",
  component: IconTrophy,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconTrophy>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
