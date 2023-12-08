import type { Meta, StoryObj } from "@storybook/react";
import { PostEntryForm } from "./post-entry-form";

const meta: Meta<typeof PostEntryForm> = {
  title: "Organisms/Post Entry Form",
  component: PostEntryForm,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostEntryForm>;

export const Create: Story = {
  ...meta,
  args: {
    mode: "create",
  },
};

export const Edit: Story = {
  ...meta,
  args: {
    mode: "edit",
    postData: {
      title: "Cascading Style Sheets",
      acronym: "CSS",
      abbreviation: "CSS",
      initialism: "CSS",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      fileUnder: "",
      body: "A style sheet language used for describing the presentation of a document written in a markup language such as HTML.",
      tags: ["Computing", "Programming"],
    },
  },
};
