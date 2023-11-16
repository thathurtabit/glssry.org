import type { Meta, StoryObj } from "@storybook/react";
import { IconPerson } from "./person";

const meta: Meta<typeof IconPerson> = {
  title: "Icons/Icon Person",
  component: IconPerson,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconPerson>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
