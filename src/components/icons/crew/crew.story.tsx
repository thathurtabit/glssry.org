import type { Meta, StoryObj } from "@storybook/react";

import { IconCrew } from "./crew";

const meta: Meta<typeof IconCrew> = {
  title: "Icons/Icon Crew",
  component: IconCrew,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconCrew>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
