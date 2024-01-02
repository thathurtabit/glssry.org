import type { Meta, StoryObj } from "@storybook/react";

import { IconCrewRole } from "./crew-role";

const meta: Meta<typeof IconCrewRole> = {
  title: "Icons/Icon Crew Role",
  component: IconCrewRole,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconCrewRole>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
