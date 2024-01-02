import type { Meta, StoryObj } from "@storybook/react";

import { tagKeys } from "~/schemas/post/post.schema";
import { getRandomNumber } from "~/utils/get-random-number";

import { CategoryRowsLinks } from "./category-rows-links";

const meta: Meta<typeof CategoryRowsLinks> = {
  title: "Molecules/Category Rows Links",
  component: CategoryRowsLinks,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CategoryRowsLinks>;

export const Default: Story = {
  ...meta,
  args: {
    categoryData: tagKeys.map((tag) => [tag, getRandomNumber(1, 10)]),
  },
};
