import type { Meta, StoryObj } from "@storybook/react";

import { IconTime } from "./time";

const meta: Meta<typeof IconTime> = {
  title: "Icons/Icon Time",
  component: IconTime,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconTime>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
