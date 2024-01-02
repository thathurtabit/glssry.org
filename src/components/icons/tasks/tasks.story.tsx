import type { Meta, StoryObj } from "@storybook/react";

import { IconTasks } from "./tasks";

const meta: Meta<typeof IconTasks> = {
  title: "Icons/Icon Tasks",
  component: IconTasks,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconTasks>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
