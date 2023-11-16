import type { Meta, StoryObj } from "@storybook/react";
import { IconPlay } from "./play";

const meta: Meta<typeof IconPlay> = {
  title: "Icons/Icon Play",
  component: IconPlay,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconPlay>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
