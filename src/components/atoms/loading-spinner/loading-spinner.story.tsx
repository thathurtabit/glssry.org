import type { Meta, StoryObj } from "@storybook/react";

import { LoadingSpinner } from "./loading-spinner";

const meta: Meta<typeof LoadingSpinner> = {
  title: "Atoms/Loading Spinner",
  component: LoadingSpinner,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = { ...meta };
