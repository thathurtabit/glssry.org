import type { Meta, StoryObj } from "@storybook/react";
import { InfoPanel } from "./info-panel";

const meta: Meta<typeof InfoPanel> = {
  title: "Atoms/Info Panel",
  component: InfoPanel,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InfoPanel>;

export const Default: Story = {
  ...meta,
  args: {
    title: "Info Panel",
    type: "warning",
    children: "Info Panel",
  },
};
