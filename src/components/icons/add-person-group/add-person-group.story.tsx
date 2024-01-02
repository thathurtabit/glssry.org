import type { Meta, StoryObj } from "@storybook/react";

import { IconAddPersonGroup } from "./add-person-group";

const meta: Meta<typeof IconAddPersonGroup> = {
  title: "Icons/Icon Add Person Group",
  component: IconAddPersonGroup,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconAddPersonGroup>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
