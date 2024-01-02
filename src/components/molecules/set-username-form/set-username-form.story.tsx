import type { Meta, StoryObj } from "@storybook/react";

import { SetUsernameForm } from "./set-username-form";

const meta: Meta<typeof SetUsernameForm> = {
  title: "Molecules/Set Username Form",
  component: SetUsernameForm,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SetUsernameForm>;

export const Default: Story = {
  ...meta,
};
