import type { Meta, StoryObj } from "@storybook/react";

import { RelatedTaxonomyPosts } from "./related-taxonomy-posts";

const meta: Meta<typeof RelatedTaxonomyPosts> = {
  title: "Molecules/Related Taxonomy Posts",
  component: RelatedTaxonomyPosts,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RelatedTaxonomyPosts>;

export const Default: Story = {
  ...meta,
  args: {},
};
