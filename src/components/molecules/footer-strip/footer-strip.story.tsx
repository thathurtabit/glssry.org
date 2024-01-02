import type { Meta, StoryObj } from "@storybook/react";

import { FooterStrip } from "./footer-strip";

const meta: Meta<typeof FooterStrip> = {
  title: "Molecules/Footer Strip",
  component: FooterStrip,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FooterStrip>;

export const Default: Story = {
  ...meta,
  args: {},
};
