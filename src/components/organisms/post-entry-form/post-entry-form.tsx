import type { FC } from "react";
import type { IPostEntryForm } from "./post-entry-form.types";
import { SectionTitle } from "~/components/atoms/section-title/section-title";
import { FormInput } from "~/components/atoms/form-input/form-input";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { appTitle } from "~/settings/constants";
import { Button } from "~/components/atoms/button/button";

export const PostEntryForm: FC<IPostEntryForm> = ({ mode }) => {
  const sectionTitle = mode === "create" ? "Create Post" : "Edit Post";
  return (
    <section>
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
        id="post-input-body"
        label="Body"
        placeholder="i.e. Some information about CSS."
        hasError={false}
      />
      <FormInput
        id="post-input-link"
        label="Link"
        type="url"
        hasError={false}
        placeholder="i.e.  reputable-source.com"
        prefix="https://"
      />
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </section>
  );
};
