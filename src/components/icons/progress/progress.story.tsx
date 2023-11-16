import type { Meta, StoryObj } from "@storybook/react";
import { IconProgress } from "./progress";

const meta: Meta<typeof IconProgress> = {
  title: "Icons/Icon Progress",
  component: IconProgress,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconProgress>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
