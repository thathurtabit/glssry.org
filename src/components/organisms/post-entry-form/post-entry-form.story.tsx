import type { Meta, StoryObj } from "@storybook/react";
import { PostEntryForm } from "./post-entry-form";

const meta: Meta<typeof PostEntryForm> = {
  title: "Organisms/Post Entry Form",
  component: PostEntryForm,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostEntryForm>;

export const Create: Story = {
  ...meta,
  args: {
    mode: "create",
  },
};

export const Edit: Story = {
  ...meta,
  args: {
    mode: "edit",
  },
};
