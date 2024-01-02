import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs } from "./breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Organisms/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  ...meta,
};
