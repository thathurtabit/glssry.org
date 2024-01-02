import type { Meta, StoryObj } from "@storybook/react";

import { EphemeralNotificationsExample } from "./example/ephemeral-notifications.example";

const meta: Meta<typeof EphemeralNotificationsExample> = {
  title: "Atoms/Ephemeral Notifications (Example)",
  component: EphemeralNotificationsExample,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof EphemeralNotificationsExample>;

export const Default: Story = { ...meta };
