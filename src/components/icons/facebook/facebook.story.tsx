import type { Meta, StoryObj } from "@storybook/react";

import { IconFacebook } from "./facebook";

const meta: Meta<typeof IconFacebook> = {
  title: "Icons/Icon Facebook",
  component: IconFacebook,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconFacebook>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
