import type { Meta, StoryObj } from "@storybook/react";
import { HeaderStrip } from "./header-strip";

const meta: Meta<typeof HeaderStrip> = {
  title: "Molecules/Header Strip",
  component: HeaderStrip,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderStrip>;

export const Default: Story = {
  ...meta,
};
