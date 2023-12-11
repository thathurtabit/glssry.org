import type { ChangeEvent } from "react";
import { tagKeys, type TPostKeys } from "~/schemas/post/post.schema";
import type { IPostEntryForm } from "./post-entry-form.types";
import { useReducer, type FC } from "react";
import { SectionTitle } from "~/components/atoms/section-title/section-title";
import { FormInput } from "~/components/atoms/form-input/form-input";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { appTitle } from "~/settings/constants";
import { Button } from "~/components/atoms/button/button";
import { FormTextarea } from "~/components/atoms/form-textarea/form-textarea";
import { postReducer } from "./reducer/form.reducer";
import { initState } from "./reducer/init-state";
import { Post } from "~/components/molecules/post/post";
import { getTRPCPostFormat } from "~/utils/get-trpc-post-format";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { FormSelect } from "~/components/atoms/form-select/form-select";

export const PostEntryForm: FC<IPostEntryForm> = ({ mode, postData }) => {
  const reducerState = postData ?? initState;
  const [state, dispatch] = useReducer(postReducer, reducerState);
  const sectionTitle = mode === "create" ? "Create Post" : "Edit Post";

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    type: TPostKeys
  ) => {
    dispatch({ type, payload: event.target.value });
  };

  const postPreviewData = getTRPCPostFormat(state);

  return (
    <section className="flex my-10 gap-10 container">
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
          value={state.title}
          onChange={(event) => handleOnChange(event, "title")}
        />
        <FormInput
          id="post-input-acronym"
          label="Acronym"
          placeholder="i.e. CSS"
          hasError={false}
          value={state.acronym}
          onChange={(event) => handleOnChange(event, "acronym")}
        />
        <FormInput
          id="post-input-abbreviation"
          label="Abbreviation"
          placeholder="i.e. CSS"
          hasError={false}
          value={state.abbreviation}
          onChange={(event) => handleOnChange(event, "abbreviation")}
        />
        <FormInput
          id="post-input-initialism"
          label="Initialism"
          placeholder="i.e. CSS"
          hasError={false}
          value={state.initialism}
          onChange={(event) => handleOnChange(event, "initialism")}
        />
        <FormInput
          id="post-input-link"
          label="Link"
          type="url"
          hasError={false}
          placeholder="i.e.  https://reputable-source.com"
          value={state.link}
          onChange={(event) => handleOnChange(event, "link")}
        />
        <FormSelect
          id="post-input-file-under"
          label="File Under"
          hasError={false}
          value={state.fileUnder}
          optionList={tagKeys}
          onChange={(event) => handleOnChange(event, "fileUnder")}
        />
        <FormSelect
          id="post-input-tags"
          label="Tags"
          hasError={false}
          value={state.tags}
          optionList={tagKeys}
          onChange={(event) => handleOnChange(event, "tags")}
        />
        <FormTextarea
          id="post-input-body"
          label="Body"
          placeholder="i.e. Some information about CSS."
          hasError={false}
          value={state.body}
          onChange={(event) => handleOnChange(event, "body")}
        />
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </div>
      <div className="flex-1">
        <SectionSubtitle>Preview</SectionSubtitle>
        {postPreviewData ? <Post {...postPreviewData} /> : null}
      </div>
    </section>
  );
};
