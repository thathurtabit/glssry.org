import type { Meta, StoryObj } from "@storybook/react";

import { IconRandom } from "./random";

const meta: Meta<typeof IconRandom> = {
  title: "Icons/Icon Random",
  component: IconRandom,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconRandom>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
