import type { Meta, StoryObj } from "@storybook/react";
import { IconTag } from "./tag";

const meta: Meta<typeof IconTag> = {
  title: "Icons/Icon Tag",
  component: IconTag,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconTag>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
