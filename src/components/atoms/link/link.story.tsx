import type { Meta, StoryObj } from "@storybook/react";

import { IconCrew } from "~/components/icons/crew/crew";

import { Link } from "./link";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  ...meta,
  args: {
    href: "https://www.google.com",
    title: "Link title",
    variant: "primary",
    size: "medium",
    children: "Link text",
  },
};

export const WithIcon: Story = {
  ...meta,
  args: {
    href: "https://www.google.com",
    title: "Link title",
    variant: "primary",
    size: "medium",
    children: (
      <>
        <IconCrew />
        <span>Link Text</span>
      </>
    ),
  },
};
