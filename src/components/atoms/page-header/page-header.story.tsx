import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./page-header";

const meta: Meta<typeof PageHeader> = {
  title: "Atoms/Page Header",
  component: PageHeader,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  ...meta,
  args: {
    preText: "Pre text",
    text: "Page Header",
  },
};
