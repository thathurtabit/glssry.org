import type { Meta, StoryObj } from "@storybook/react";
import { IconCalendar } from "./calendar";

const meta: Meta<typeof IconCalendar> = {
  title: "Icons/Icon Calendar",
  component: IconCalendar,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconCalendar>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
