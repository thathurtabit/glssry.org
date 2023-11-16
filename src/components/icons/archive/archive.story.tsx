import type { Meta, StoryObj } from "@storybook/react";
import { IconArchive } from "./archive";

const meta: Meta<typeof IconArchive> = {
  title: "Icons/Icon Archive",
  component: IconArchive,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconArchive>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
