import type { Meta, StoryObj } from "@storybook/react";

import { InfoIcon } from "./info-panel-icon";

const meta: Meta<typeof InfoIcon> = {
  title: "Atoms/Info Icon",
  component: InfoIcon,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InfoIcon>;

export const Default: Story = { ...meta, args: { type: "warning" } };
