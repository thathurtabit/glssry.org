import type { Meta, StoryObj } from "@storybook/react";
import { EphemeralNotificationsCustomIconExample } from "./example/ephemeral-notifications-custom-icon.example";

const meta: Meta<typeof EphemeralNotificationsCustomIconExample> = {
  title: "Atoms/Ephemeral Notifications (Custom Icon)",
  component: EphemeralNotificationsCustomIconExample,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof EphemeralNotificationsCustomIconExample>;

export const Default: Story = { ...meta };
