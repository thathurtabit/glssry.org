import type { Meta, StoryObj } from "@storybook/react";

import { EphemeralNotificationsListExample } from "./example/ephemeral-notifications.example-list";

const meta: Meta<typeof EphemeralNotificationsListExample> = {
  title: "Atoms/Ephemeral Notifications (List)",
  component: EphemeralNotificationsListExample,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof EphemeralNotificationsListExample>;

export const Default: Story = { ...meta };
