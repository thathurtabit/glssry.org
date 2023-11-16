import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { IconAccount } from "~/components/icons/account/account";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    loading: false,
    children: "Button text",
  },
};

export const PrimaryWithIcon: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    loading: false,
    children: (
      <>
        <IconAccount />
        <span>Button Text</span>
      </>
    ),
  },
};

export const PrimaryLoading: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    loading: true,
    children: (
      <>
        <IconAccount />
        <span>Button Text</span>
      </>
    ),
  },
};

export const PrimaryDisabled: Story = {
  ...meta,
  args: {
    title: "Primary disabled button",
    size: "medium",
    loading: false,
    variant: "primary",
    disabled: true,
    children: (
      <>
        <IconAccount />
        <span>Disabled</span>
      </>
    ),
  },
};

export const Secondary: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    loading: false,
    variant: "secondary",
    children: "Button text",
  },
};

export const SecondaryWithIcon: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    loading: false,
    variant: "secondary",
    children: (
      <>
        <IconAccount />
        <span>Button Text</span>
      </>
    ),
  },
};

export const SecondaryLoading: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    loading: true,
    variant: "secondary",
    children: (
      <>
        <IconAccount />
        <span>Button Text</span>
      </>
    ),
  },
};

export const SecondaryDisabled: Story = {
  ...meta,
  args: {
    title: "Disabled button",
    size: "medium",
    loading: false,
    variant: "secondary",
    disabled: true,
    children: (
      <>
        <IconAccount />
        <span>Disabled</span>
      </>
    ),
  },
};

export const Play: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    shape: "round",
    control: "play",
  },
};

export const Stop: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    shape: "round",
    control: "stop",
  },
};

export const Reset: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    shape: "round",
    control: "reset",
  },
};

export const Error: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    loading: false,
    hasError: true,
    children: (
      <>
        <IconAccount />
        <span>Button Text</span>
      </>
    ),
  },
};

export const Next: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    loading: false,
    direction: "next",
  },
};

export const Prev: Story = {
  ...meta,
  args: {
    title: "Button title",
    size: "medium",
    loading: false,
    direction: "prev",
  },
};
