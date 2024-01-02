import type { Meta, StoryObj } from "@storybook/react";

import { BadgeCount } from "./badge-count";

const meta: Meta<typeof BadgeCount> = {
  title: "Atoms/Badge Count",
  component: BadgeCount,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BadgeCount>;

export const Default: Story = { ...meta, args: { count: 5 } };
