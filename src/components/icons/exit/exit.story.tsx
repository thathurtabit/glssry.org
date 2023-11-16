import type { Meta, StoryObj } from "@storybook/react";
import { IconExit } from "./exit";

const meta: Meta<typeof IconExit> = {
  title: "Icons/Icon Exit",
  component: IconExit,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconExit>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
