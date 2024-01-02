import type { Meta, StoryObj } from "@storybook/react";

import { HeaderMenu } from "./header-menu";

const meta: Meta<typeof HeaderMenu> = {
  title: "Organisms/Header Menu",
  component: HeaderMenu,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderMenu>;

export const Default: Story = {
  ...meta,
};
