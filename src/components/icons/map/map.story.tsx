import type { Meta, StoryObj } from "@storybook/react";

import { IconMap } from "./map";

const meta: Meta<typeof IconMap> = {
  title: "Icons/Icon Map",
  component: IconMap,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconMap>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
