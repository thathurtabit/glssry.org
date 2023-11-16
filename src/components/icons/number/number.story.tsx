import type { Meta, StoryObj } from "@storybook/react";
import { IconNumber } from "./number";

const meta: Meta<typeof IconNumber> = {
  title: "Icons/Icon Number",
  component: IconNumber,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconNumber>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
