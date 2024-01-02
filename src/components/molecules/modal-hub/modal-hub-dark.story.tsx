
import type { Meta, StoryObj } from "@storybook/react";

import { ModalHub } from "./modal-hub";
import { ModalHubStoryWrapper } from "./modal-hub.story-wrapper";
import { darkInitialState } from "./modal-hub.story.data";

const meta: Meta<typeof ModalHub> = {
  title: "Molecules/Modal Hub (Dark)",
  component: ModalHub,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  render: (arguments_) => (
    <ModalHubStoryWrapper {...arguments_} {...darkInitialState.page.modal} />
  ),
};

export default meta;

type Story = StoryObj<typeof ModalHub>;

export const Default: Story = {
  ...meta,
};

export const Medium: Story = {
  ...meta,
  render: (arguments_) => (
    <ModalHubStoryWrapper
      {...arguments_}
      {...darkInitialState.page.modal}
      type="medium"
    />
  ),
};

export const Large: Story = {
  ...meta,
  render: (arguments_) => (
    <ModalHubStoryWrapper
      {...arguments_}
      {...darkInitialState.page.modal}
      type="large"
    />
  ),
};

