import type { TPost, TPostKeys } from "~/schemas/post/post.schema";
import type { IPostEntryForm, TPostEntryEvent } from "./post-entry-form.types";
import type { FormEvent } from "react";
import {
  postSchema,
  tagsKeysWithSelectInstruction,
} from "~/schemas/post/post.schema";
import { useReducer, type FC, Fragment, useState } from "react";
import { FormInput } from "~/components/atoms/form-input/form-input";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { EURLS, appTitle, appURL } from "~/settings/constants";
import { Button } from "~/components/atoms/button/button";
import { FormTextarea } from "~/components/atoms/form-textarea/form-textarea";
import { postReducer } from "./reducer/form.reducer";
import { initState } from "./reducer/init-state";
import { Post } from "~/components/molecules/post/post";
import { getTRPCPostFormat } from "~/utils/get-trpc-post-format";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { FormSelect } from "~/components/atoms/form-select/form-select";
import { TagsList } from "./children/tags-list/tags-list";
import { HorizontalRule } from "~/components/atoms/hr/hr";
import { useFormValidation } from "~/hooks/post/form-validation.hook";
import { useCreatePost } from "~/hooks/post/create-post.hook";
import { useUpdatePost } from "~/hooks/post/update-post.hook";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import Link from "next/link";

export const PostEntryForm: FC<IPostEntryForm> = ({
  postId,
  mode,
  postData,
}) => {
  const reducerState = postData ?? initState;
  const [state, dispatch] = useReducer(postReducer, reducerState);
  const [postSuccessful, setPostSuccessful] = useState(false);

  const { createPostMutation } = useCreatePost({
    onSuccessCallback: () => setPostSuccessful(true),
  });
  const { updatePostMutation } = useUpdatePost({
    onSuccessCallback: () => setPostSuccessful(true),
  });

  const handleOnChange = (event: TPostEntryEvent, type: TPostKeys) => {
    if (!event.target) {
      return;
    }

    dispatch({ type, payload: event.target.value });
  };

  const handleOnTagsChange = (tags: string[]) => {
    dispatch({ type: "tags", payload: tags });
  };

  const { errorState, getIsFormDataValid } = useFormValidation<TPost>({
    currentFormState: state,
    currentFormSchema: postSchema,
  });

  const { hasError, errorData } = errorState ?? {};

  const postPreviewData = getTRPCPostFormat(state);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isDataValid = getIsFormDataValid();

    if (!isDataValid) {
      return;
    }

    if (mode === "create") {
      createPostMutation(state);
      return;
    }

    if (mode === "edit" && postId) {
      updatePostMutation({
        postId,
        data: state,
      });
    }
  };

  if (postSuccessful) {
    return (
      <InfoPanel
        type="success"
        title={mode === "create" ? "Post created" : "Post updated"}
      >
        <p>
          <strong>{state.title}</strong> has been successfully submitted and is
          pending approval. Thank you!
        </p>
        <p>
          <Link href={EURLS.Home}>Home</Link>
        </p>
      </InfoPanel>
    );
  }

  return (
    <form className="flex my-10 gap-10 w-full" onSubmit={handleFormSubmit}>
      <div className="flex-1">
        <PageIntro
          textList={[
            `${
              mode === "create" ? "Create" : "Edit"
            } a ${appTitle} post to help kill off confusion.`,
            <Fragment key="">
              Required fields marked with <span className="text-error">*</span>
            </Fragment>,
          ]}
        />
        <FormInput
          required
          id="post-input-title"
          label="Post title"
          placeholder="i.e. Cascading Style Sheets"
          hasError={Boolean(errorData?.title)}
          errorText={errorData?.title}
          value={state.title}
          onChange={(event) => handleOnChange(event, "title")}
        />
        <FormInput
          required
          id="post-input-acronym"
          label="Acronym"
          placeholder="i.e. CSS"
          hasError={Boolean(errorData?.acronym)}
          errorText={errorData?.acronym}
          value={state.acronym}
          onChange={(event) => handleOnChange(event, "acronym")}
        />
        <FormInput
          required
          id="post-input-abbreviation"
          label="Abbreviation"
          placeholder="i.e. CSS"
          hasError={Boolean(errorData?.abbreviation)}
          errorText={errorData?.abbreviation}
          value={state.abbreviation}
          onChange={(event) => handleOnChange(event, "abbreviation")}
        />
        <FormInput
          required
          id="post-input-initialism"
          label="Initialism"
          placeholder="i.e. CSS"
          hasError={Boolean(errorData?.initialism)}
          errorText={errorData?.initialism}
          value={state.initialism}
          onChange={(event) => handleOnChange(event, "initialism")}
        />
        <FormInput
          required
          id="post-input-link"
          label="Link"
          description="The source of this post"
          type="url"
          errorText={errorData?.link}
          hasError={Boolean(errorData?.link)}
          placeholder="i.e.  https://reputable-source.com"
          value={state.link}
          onChange={(event) => handleOnChange(event, "link")}
        />
        <FormSelect
          required
          id="post-input-file-under"
          label="File Under"
          description="The category this post will be filed under"
          hasError={Boolean(errorData?.fileUnder)}
          value={state.fileUnder}
          errorText={errorData?.fileUnder}
          optionList={tagsKeysWithSelectInstruction}
          onChange={(event) => handleOnChange(event, "fileUnder")}
        />
        <HorizontalRule position="left" />
        <SectionSubtitle noMargin>Tags</SectionSubtitle>
        <p className="mb-5">
          <small>Other categories this post is related to</small>
        </p>
        {state.tags ? (
          <TagsList
            tags={state.tags}
            handleOnTagsChange={handleOnTagsChange}
            errorText={errorData?.tags}
          />
        ) : null}
        <HorizontalRule position="left" />
        <FormTextarea
          required
          id="post-input-body"
          label="Body"
          placeholder="i.e. A summary of what this post is about..."
          hasError={Boolean(errorData?.body)}
          errorText={errorData?.body}
          value={state.body}
          onChange={(event) => handleOnChange(event, "body")}
        />
        <FormInput
          id="post-related-post-id-1"
          label="Related post Id #1"
          description="The Id of a closely related post"
          type="string"
          hasError={Boolean(errorData?.relatedPostId1)}
          value={state.relatedPostId1}
          onChange={(event) => handleOnChange(event, "relatedPostId1")}
        />
        <FormInput
          id="post-related-post-id-2"
          label="Related post Id #2"
          description="The Id of a closely related post"
          type="string"
          hasError={Boolean(errorData?.relatedPostId2)}
          value={state.relatedPostId2}
          onChange={(event) => handleOnChange(event, "relatedPostId2")}
        />
        <Button
          type="submit"
          variant={hasError ? "danger" : "primary"}
          className="mt-4"
        >
          {mode === "create" ? "Submit" : "Update"}
        </Button>
      </div>
      <div className="flex-1">
        <SectionSubtitle>Preview</SectionSubtitle>
        {postPreviewData ? <Post {...postPreviewData} /> : null}
        <div className="mt-5">
          <SectionSubtitle>Slug</SectionSubtitle>
          <p>
            {appURL}/{state.slug}
          </p>
        </div>
      </div>
    </form>
  );
};
