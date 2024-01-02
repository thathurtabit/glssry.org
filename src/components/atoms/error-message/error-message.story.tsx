import type { Meta, StoryObj } from "@storybook/react";

import { ErrorMessage } from "./error-message";

const meta: Meta<typeof ErrorMessage> = {
  title: "Atoms/Error Message",
  component: ErrorMessage,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  ...meta,
  args: {
    title: "Error title",
    text: "This is my error message! Nobody likes to see these, but we can at least make them helpful",
  },
};
