import type { Meta, StoryObj } from "@storybook/react";

import { IconWarning } from "./warning";

const meta: Meta<typeof IconWarning> = {
  title: "Icons/Icon Warning",
  component: IconWarning,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconWarning>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
