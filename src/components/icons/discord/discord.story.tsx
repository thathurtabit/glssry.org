import type { Meta, StoryObj } from "@storybook/react";
import { IconDiscord } from "./discord";

const meta: Meta<typeof IconDiscord> = {
  title: "Icons/Icon Discord",
  component: IconDiscord,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconDiscord>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
