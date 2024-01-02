import type { Meta, StoryObj } from "@storybook/react";

import { IconReddit } from "./reddit";

const meta: Meta<typeof IconReddit> = {
  title: "Icons/Icon Reddit",
  component: IconReddit,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconReddit>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
