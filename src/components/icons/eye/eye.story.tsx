import type { Meta, StoryObj } from "@storybook/react";

import { IconEye } from "./eye";

const meta: Meta<typeof IconEye> = {
  title: "Icons/Icon Eye",
  component: IconEye,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconEye>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
