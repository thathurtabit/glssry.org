import type { Meta, StoryObj } from "@storybook/react";
import { IconReplySent } from "./reply-sent";

const meta: Meta<typeof IconReplySent> = {
  title: "Icons/Icon Reply Sent",
  component: IconReplySent,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconReplySent>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
