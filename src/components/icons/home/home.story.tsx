import type { Meta, StoryObj } from "@storybook/react";

import { IconHome } from "./home";

const meta: Meta<typeof IconHome> = {
  title: "Icons/Icon Home",
  component: IconHome,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconHome>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
