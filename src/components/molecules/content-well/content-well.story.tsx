import type { Meta, StoryObj } from "@storybook/react";
import { ContentWell } from "./content-well";

const meta: Meta<typeof ContentWell> = {
  title: "Molecules/Content Well",
  component: ContentWell,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContentWell>;

export const Default: Story = {
  ...meta,
  args: {
    children: <p>Content well</p>,
  },
};
