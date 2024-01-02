import type { Meta, StoryObj } from "@storybook/react";

import { IconEdit } from "./edit";

const meta: Meta<typeof IconEdit> = {
  title: "Icons/Icon Edit",
  component: IconEdit,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconEdit>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
