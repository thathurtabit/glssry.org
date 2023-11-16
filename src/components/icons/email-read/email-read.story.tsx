import type { Meta, StoryObj } from "@storybook/react";
import { IconEmailRead } from "./email-read";

const meta: Meta<typeof IconEmailRead> = {
  title: "Icons/Icon Email Read",
  component: IconEmailRead,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconEmailRead>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
