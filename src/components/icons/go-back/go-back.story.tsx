import type { Meta, StoryObj } from "@storybook/react";

import { IconGoBack } from "./go-back";

const meta: Meta<typeof IconGoBack> = {
  title: "Icons/Icon Go Back",
  component: IconGoBack,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconGoBack>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
