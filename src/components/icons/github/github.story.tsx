import type { Meta, StoryObj } from "@storybook/react";
import { IconGithub } from "./github";

const meta: Meta<typeof IconGithub> = {
  title: "Icons/Icon Github",
  component: IconGithub,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconGithub>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
