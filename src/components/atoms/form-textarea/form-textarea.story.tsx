import type { Meta, StoryObj } from "@storybook/react";
import { FormTextarea } from "./form-textarea";

const meta: Meta<typeof FormTextarea> = {
  title: "Atoms/Form Textarea",
  component: FormTextarea,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormTextarea>;

export const Default: Story = {
  ...meta,
  args: {
    id: "default",
    label: "Default",
    placeholder: "Placeholder",
    hasError: false,
    errorText: "Error text",
  },
};

export const DefaultWithError: Story = {
  ...meta,
  args: {
    id: "default",
    label: "Default",
    hasError: true,
    errorText: "Error text",
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
  },
  parameters: {
    inverse: true,
  },
};

export const WithDescription: Story = {
  ...meta,
  args: {
    id: "with-button-and-description",
    label: "With button and description",
    description: "Description text to help with the input below",
    hasError: false,
    errorText: "Error text",
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
  },
};
