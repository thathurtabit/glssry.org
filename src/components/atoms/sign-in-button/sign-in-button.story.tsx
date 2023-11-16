import type { Meta, StoryObj } from "@storybook/react";
import { SignInOrOutButton } from "./sign-in-button";

const meta: Meta<typeof SignInOrOutButton> = {
  title: "Atoms/Sign In Or Out Button",
  component: SignInOrOutButton,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SignInOrOutButton>;

export const Default: Story = {
  ...meta,
  args: {
    allowSignOut: true,
  },
};
