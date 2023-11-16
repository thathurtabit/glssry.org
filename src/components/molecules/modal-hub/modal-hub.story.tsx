
import type { Meta, StoryObj } from "@storybook/react";
import { ModalHub } from "./modal-hub";
import { ModalHubStoryWrapper } from "./modal-hub.story-wrapper";
import { initialState } from "./modal-hub.story.data";

const meta: Meta<typeof ModalHub> = {
  title: "Molecules/Modal Hub",
  component: ModalHub,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  render: (arguments_) => (
    <ModalHubStoryWrapper {...arguments_} {...initialState.page.modal} />
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
      {...initialState.page.modal}
      type="medium"
    />
  ),
};

export const Large: Story = {
  ...meta,
  render: (arguments_) => (
    <ModalHubStoryWrapper {...arguments_} {...initialState.page.modal} type="large" />
  ),
};

