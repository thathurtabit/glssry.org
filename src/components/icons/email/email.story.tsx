import type { Meta, StoryObj } from "@storybook/react";

import { IconEmail } from "./email";

const meta: Meta<typeof IconEmail> = {
  title: "Icons/Icon Email",
  component: IconEmail,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconEmail>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
