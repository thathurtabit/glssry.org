import type { Meta, StoryObj } from "@storybook/react";
import { LinkText } from "./link-text";

const meta: Meta<typeof LinkText> = {
  title: "Atoms/Link Text",
  component: LinkText,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkText>;

export const Default: Story = {
  ...meta,
  args: {
    children: "Link text",
    href: "/",
  },
};
