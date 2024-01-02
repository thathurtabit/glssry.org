import type { Meta, StoryObj } from "@storybook/react";

import { tagKeys } from "~/schemas/post/post.schema";

import { FormSelect } from "./form-select";

const meta: Meta<typeof FormSelect> = {
  title: "Atoms/Form Select",
  component: FormSelect,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormSelect>;

export const Default: Story = {
  ...meta,
  args: {
    id: "default",
    label: "Default",
    placeholder: "Placeholder",
    hasError: false,
    errorText: "Error text",
    optionList: tagKeys,
  },
};

export const DefaultWithError: Story = {
  ...meta,
  args: {
    id: "default",
    label: "Default",
    hasError: true,
    errorText: "Error text",
    optionList: tagKeys,
  },
};

export const Inverse: Story = {
  ...meta,
  args: {
    id: "inverse",
    label: "Inverse",
    hasError: false,
    inverse: true,
    errorText: "Error text",
    optionList: tagKeys,
  },
  parameters: {
    inverse: true,
  },
};

export const InverseWithError: Story = {
  ...meta,
  args: {
    id: "inverse-with-error",
    label: "Inverse with error",
    hasError: true,
    inverse: true,
    errorText: "Error text",
    optionList: tagKeys,
  },
  parameters: {
    inverse: true,
  },
};

export const WithButton: Story = {
  ...meta,
  args: {
    id: "with-button",
    label: "With button",
    hasError: false,
    errorText: "Error text",
    optionList: tagKeys,
  },
};

export const InverseWithButton: Story = {
  ...meta,
  args: {
    id: "inverse-with-button",
    label: "With button",
    hasError: false,
    inverse: true,
    errorText: "Error text",
    optionList: tagKeys,
  },
  parameters: {
    inverse: true,
  },
};

export const WithPrefix: Story = {
  ...meta,
  args: {
    id: "with-prefix",
    label: "With prefix",
    prefix: "£",
    hasError: false,
    errorText: "Error text",
    optionList: tagKeys,
  },
};

export const WithButtonAndDescription: Story = {
  ...meta,
  args: {
    id: "with-button-and-description",
    label: "With button and description",
    description: "Description text to help with the input below",
    hasError: false,
    errorText: "Error text",
    optionList: tagKeys,
  },
};

export const Small: Story = {
  ...meta,
  args: {
    id: "small",
    label: "Small",
    hasError: false,
    errorText: "Error text",
    inputSize: "small",
    optionList: tagKeys,
  },
};

export const SmallWithButton: Story = {
  ...meta,
  args: {
    id: "small-with-button",
    label: "Small with Button",
    hasError: false,
    errorText: "Error text",
    inputSize: "small",
    optionList: tagKeys,
  },
};
