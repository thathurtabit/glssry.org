import type { Meta, StoryObj } from "@storybook/react";
import { IconNoMovement } from "./no-movement";

const meta: Meta<typeof IconNoMovement> = {
  title: "Icons/Icon No Movement",
  component: IconNoMovement,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconNoMovement>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
