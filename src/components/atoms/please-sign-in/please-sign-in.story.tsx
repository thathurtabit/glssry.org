import type { Meta, StoryObj } from "@storybook/react";
import { PleaseSignIn } from "./please-sign-in";

const meta: Meta<typeof PleaseSignIn> = {
  title: "Atoms/Please Sign In",
  component: PleaseSignIn,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PleaseSignIn>;

export const Default: Story = {
  ...meta,
  args: {
    message: "Please sign in to view this page.",
  },
};
