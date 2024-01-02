import type { Meta, StoryObj } from "@storybook/react";

import { IconInfo } from "./info";

const meta: Meta<typeof IconInfo> = {
  title: "Icons/Icon Info",
  component: IconInfo,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconInfo>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
