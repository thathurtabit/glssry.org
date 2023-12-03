import type { FC } from "react";
import type { IPostEntryForm } from "./post-entry-form.types";
import { SectionTitle } from "~/components/atoms/section-title/section-title";
import { FormInput } from "~/components/atoms/form-input/form-input";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { appTitle } from "~/settings/constants";
import { Button } from "~/components/atoms/button/button";
import { FormTextarea } from "~/components/atoms/form-textarea/form-textarea";

export const PostEntryForm: FC<IPostEntryForm> = ({ mode }) => {
  const sectionTitle = mode === "create" ? "Create Post" : "Edit Post";
  return (
    <section className="flex my-10 gap-10">
      <div className="flex-1">
        <SectionTitle>{sectionTitle}</SectionTitle>
        <PageIntro
          textList={[
            `${
              mode === "create" ? "Create" : "Edit"
            } a ${appTitle} post to help kill off confusion.`,
          ]}
        />
        <FormInput
          id="post-input-title"
          label="Post title"
          placeholder="i.e. Cascading Style Sheets"
          hasError={false}
        />
        <FormInput
          id="post-input-acronym"
          label="Acronym"
          placeholder="i.e. CSS"
          hasError={false}
        />
        <FormInput
          id="post-input-abbreviation"
          label="Abbreviation"
          placeholder="i.e. CSS"
          hasError={false}
        />
        <FormInput
          id="post-input-initialism"
          label="Initialism"
          placeholder="i.e. CSS"
          hasError={false}
        />
        <FormInput
          id="post-input-link"
          label="Link"
          type="url"
          hasError={false}
          placeholder="i.e.  https://reputable-source.com"
        />
        <FormTextarea
          id="post-input-body"
          label="Body"
          placeholder="i.e. Some information about CSS."
          hasError={false}
        />
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </div>
      <div>
        <SectionTitle>Preview</SectionTitle>
        <div className="bg-white rounded-lg p-5">
          <h1 className="text-2xl font-semibold">Cascading Style Sheets</h1>
          <p className="text-sm text-gray-500">CSS</p>
          <p className="text-sm text-gray-500">CSS</p>
          <p className="text-sm text-gray-500">CSS</p>
        </div>
      </div>
    </section>
  );
};
