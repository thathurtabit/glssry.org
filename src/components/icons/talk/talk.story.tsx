import type { Meta, StoryObj } from "@storybook/react";
import { IconTalk } from "./talk";

const meta: Meta<typeof IconTalk> = {
  title: "Icons/Icon Talk",
  component: IconTalk,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconTalk>;

export const Default: Story = { ...meta, args: { size: "2rem" } };
