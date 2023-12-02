import type { Meta, StoryObj } from "@storybook/react";
import { SectionTitle } from "./section-title";

const meta: Meta<typeof SectionTitle> = {
  title: "Atoms/Section Title",
  component: SectionTitle,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = { ...meta, args: { children: "Section title" } };
