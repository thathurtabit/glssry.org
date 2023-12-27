import type { Meta, StoryObj } from "@storybook/react";
import { RelatedPostLoading } from "./related-post-loading";

const meta: Meta<typeof RelatedPostLoading> = {
  title: "Molecules/Related Post Loading",
  component: RelatedPostLoading,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RelatedPostLoading>;

export const Default: Story = {
  ...meta,
  args: {},
};
