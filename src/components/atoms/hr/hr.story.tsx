import type { Meta, StoryObj } from "@storybook/react";
import { HorizontalRule } from "./hr";

const meta: Meta<typeof HorizontalRule> = {
  title: "Atoms/HR",
  component: HorizontalRule,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof HorizontalRule>;

export const Default: Story = { ...meta, args: { inverse: true } };
