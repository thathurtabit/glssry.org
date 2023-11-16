import type { Meta, StoryObj } from "@storybook/react";
import { IconOverview } from "./overview";

const meta: Meta<typeof IconOverview> = {
  title: "Icons/Icon Overview",
  component: IconOverview,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconOverview>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
