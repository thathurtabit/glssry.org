import type { Meta, StoryObj } from "@storybook/react";
import { AlreadySignedIn } from "./already-signed-in";

const meta: Meta<typeof AlreadySignedIn> = {
  title: "Atoms/Already Signed In",
  component: AlreadySignedIn,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AlreadySignedIn>;

export const Default: Story = { ...meta };
