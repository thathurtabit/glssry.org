import type { Meta, StoryObj } from "@storybook/react";
import { IconSearch } from "./search";

const meta: Meta<typeof IconSearch> = {
  title: "Icons/Icon Search",
  component: IconSearch,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconSearch>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
