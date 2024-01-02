import type { Meta, StoryObj } from "@storybook/react";

import { Palette } from "./palette";

const meta: Meta<typeof Palette> = {
  title: "Tokens/Palette",
  component: Palette,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
    inverse: true,
  },
};

export default meta;

type Story = StoryObj<typeof Palette>;

export const Copy: Story = {
  ...meta,
  args: {
    styles: "bg-background text-copy",
  },
};

export const CopyInverse: Story = {
  ...meta,
  args: {
    styles: "bg-background-inverse text-copy-inverse",
  },
};

export const Link: Story = {
  ...meta,
  args: {
    styles: "bg-background text-link-light hover:underline",
  },
};

export const Action: Story = {
  ...meta,
  args: {
    styles: "bg-action text-copy-inverse",
  },
};

export const Focus: Story = {
  ...meta,
  args: {
    styles: "bg-focus text-copy",
  },
};

export const Error: Story = {
  ...meta,
  args: {
    styles: "bg-error text-copy",
  },
};

export const Success: Story = {
  ...meta,
  args: {
    styles: "bg-success text-copy-inverse",
  },
};
