import type { Meta, StoryObj } from "@storybook/react";
import { ButtonText } from "./button-text";

const meta: Meta<typeof ButtonText> = {
  title: "Atoms/Button Text",
  component: ButtonText,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonText>;

export const Default: Story = { ...meta, args: { children: "Button text" } };
