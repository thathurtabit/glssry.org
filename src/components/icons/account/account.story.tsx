import type { Meta, StoryObj } from "@storybook/react";
import { IconAccount } from "./account";

const meta: Meta<typeof IconAccount> = {
  title: "Icons/Icon Account",
  component: IconAccount,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconAccount>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
