import type { Meta, StoryObj } from "@storybook/react";

import { IconError } from "./error";

const meta: Meta<typeof IconError> = {
  title: "Icons/Icon Error",
  component: IconError,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconError>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
