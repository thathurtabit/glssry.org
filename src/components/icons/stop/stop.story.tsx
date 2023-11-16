import type { Meta, StoryObj } from "@storybook/react";
import { IconStop } from "./stop";

const meta: Meta<typeof IconStop> = {
  title: "Icons/Icon Stop",
  component: IconStop,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconStop>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
