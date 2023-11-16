import type { Meta, StoryObj } from "@storybook/react";
import { IconGoDown } from "./go-down";

const meta: Meta<typeof IconGoDown> = {
  title: "Icons/Icon Go Down",
  component: IconGoDown,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconGoDown>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
