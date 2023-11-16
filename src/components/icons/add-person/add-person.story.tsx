import type { Meta, StoryObj } from "@storybook/react";
import { IconAddPerson } from "./add-person";

const meta: Meta<typeof IconAddPerson> = {
  title: "Icons/Icon Add Person",
  component: IconAddPerson,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconAddPerson>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
