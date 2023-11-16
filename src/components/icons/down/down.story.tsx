import type { Meta, StoryObj } from "@storybook/react";
import { IconDown } from "./down";

const meta: Meta<typeof IconDown> = {
  title: "Icons/Icon Down",
  component: IconDown,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconDown>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
