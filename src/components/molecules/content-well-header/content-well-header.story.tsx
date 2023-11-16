import type { Meta, StoryObj } from "@storybook/react";
import { ContentWellHeader } from "./content-well-header";

const meta: Meta<typeof ContentWellHeader> = {
  title: "Molecules/Content Well Header",
  component: ContentWellHeader,
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "hsl(43deg 100% 85%)",
        },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContentWellHeader>;

export const Default: Story = {
  ...meta,
  args: {
    text: "Content Well Header",
    span: "Intro",
  },
};
