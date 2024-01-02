import type { Meta, StoryObj } from "@storybook/react";

import { SectionSubtitle } from "./section-subtitle";

const meta: Meta<typeof SectionSubtitle> = {
  title: "Atoms/Section Subtitle",
  component: SectionSubtitle,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SectionSubtitle>;

export const Default: Story = {
  ...meta,
  args: { children: "Section Subtitle" },
};
