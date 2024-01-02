import type { Meta, StoryObj } from "@storybook/react";

import { IconExternalLink } from "./external-link";

const meta: Meta<typeof IconExternalLink> = {
  title: "Icons/Icon External Link",
  component: IconExternalLink,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconExternalLink>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
