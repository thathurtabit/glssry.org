import type { Meta, StoryObj } from "@storybook/react";

import { IconGrid } from "./grid";

const meta: Meta<typeof IconGrid> = {
  title: "Icons/Icon Grid",
  component: IconGrid,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconGrid>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
