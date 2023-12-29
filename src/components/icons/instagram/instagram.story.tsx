import type { Meta, StoryObj } from "@storybook/react";
import { IconInstagram } from "./instagram";

const meta: Meta<typeof IconInstagram> = {
  title: "Icons/Icon Instagram",
  component: IconInstagram,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconInstagram>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
