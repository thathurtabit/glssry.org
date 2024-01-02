import type { Meta, StoryObj } from "@storybook/react";

import { IconSad } from "./sad";

const meta: Meta<typeof IconSad> = {
  title: "Icons/Icon Sad",
  component: IconSad,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconSad>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
