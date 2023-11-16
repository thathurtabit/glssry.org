import type { Meta, StoryObj } from "@storybook/react";
import { IconMenu } from "./menu";

const meta: Meta<typeof IconMenu> = {
  title: "Icons/Icon Menu",
  component: IconMenu,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconMenu>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
