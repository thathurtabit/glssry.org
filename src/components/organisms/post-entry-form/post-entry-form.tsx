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
import { IconThumb } from "~/components/icons/thumb/thumb";
import { Link } from "~/components/atoms/link/link";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { useSearchPublishedPosts } from "~/hooks/post/search-published-posts.hook";
import { IconExternalLink } from "~/components/icons/external-link/external-link";

export const PostEntryForm: FC<IPostEntryForm> = ({
  postId,
  mode,
  postData,
}) => {
  const reducerState = postData ?? initState;
  const [hasSubmittedTitleCheck, setHasSubmittedTitleCheck] = useState(false);
  const [state, dispatch] = useReducer(postReducer, reducerState);
  const [postSuccessful, setPostSuccessful] = useState(false);

  const {
    searchedPublishedPostsData,
    searchedPublishedPostsDataIsFetching,
    searchedPublishedPostsDataHasError,
    searchedPublishedPostsDataError,
  } = useSearchPublishedPosts({
    searchTerm: state.title,
    shouldSearch: hasSubmittedTitleCheck,
  });

  const postAlreadyExists = Boolean(
    state.title && searchedPublishedPostsData?.length
  );

  const isOKToShowFullForm =
    mode === "edit" ||
    (state.title &&
      !searchedPublishedPostsData?.length &&
      hasSubmittedTitleCheck &&
      !searchedPublishedPostsDataIsFetching);

  const { createPostMutation, createPostMutationIsLoading } = useCreatePost({
    onSuccessCallback: () => setPostSuccessful(true),
  });
  const { updatePostMutation, updatePostMutationIsLoading } = useUpdatePost({
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

  const shouldDisableInputs =
    createPostMutationIsLoading || updatePostMutationIsLoading;

  const disablePreliminaryPostTitleSearch =
    shouldDisableInputs || state.title.length < 2;

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

  const handleResetForm = () => {
    dispatch({ type: "reset", payload: initState });
    setPostSuccessful(false);
  };

  if (postSuccessful) {
    return (
      <Fragment>
        <SectionSubtitle className="flex items-center gap-1">
          {mode === "create" ? "Post created" : "Post updated"} <IconThumb />
        </SectionSubtitle>
        <p>
          &ldquo;<strong>{state.title}</strong>&ldquo; has been successfully
          submitted and is pending approval.
        </p>
        <p>Thank you!</p>
        <p className="flex gap-5">
          <Button onClick={handleResetForm}>Create a post</Button>
          <Link size="small" variant="secondary" href={EURLS.Home}>
            Go home
          </Link>
        </p>
      </Fragment>
    );
  }

  if (postAlreadyExists) {
    const { versions, title } = searchedPublishedPostsData?.[0] ?? {};
    const latestVersion = versions?.at(-1);
    const { fileUnder, slug } = latestVersion ?? {};

    return (
      <Fragment>
        <SectionSubtitle>Hmm, seems this post already exists</SectionSubtitle>
        <p>Searching existing posts we&apos;ve found the below</p>

        <Link
          href={`/${getKebabCaseFromSentenceCase(fileUnder ?? "")}/${slug}`}
        >
          {title} <IconExternalLink />
        </Link>
      </Fragment>
    );
  }

  if (!isOKToShowFullForm) {
    return (
      <Fragment>
        <SectionSubtitle className="flex items-center gap-1">
          Firsty, let&apos;s check if this post already exists
        </SectionSubtitle>
        <p>Please enter the full tile of the post below</p>
        <FormInput
          required
          id="post-input-title"
          label="Post title"
          placeholder="i.e. Cascading Style Sheets"
          hasError={searchedPublishedPostsDataHasError}
          errorText={searchedPublishedPostsDataError?.message}
          value={state.title}
          disabled={searchedPublishedPostsDataIsFetching}
          submitButtonData={{
            type: "submit",
            loading: searchedPublishedPostsDataIsFetching,
            disabled: disablePreliminaryPostTitleSearch,
            onClick: () => setHasSubmittedTitleCheck(true),
          }}
          onChange={(event) => handleOnChange(event, "title")}
        />
      </Fragment>
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
          disabled={shouldDisableInputs}
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
          disabled={shouldDisableInputs}
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
          disabled={shouldDisableInputs}
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
          disabled={shouldDisableInputs}
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
          disabled={shouldDisableInputs}
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
          disabled={shouldDisableInputs}
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
            disabled={shouldDisableInputs}
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
          disabled={shouldDisableInputs}
          onChange={(event) => handleOnChange(event, "body")}
        />
        <FormInput
          id="post-related-post-slug-1"
          label="Related post slug #1"
          description="The slug of a closely related post"
          type="string"
          placeholder="i.e. javascript"
          hasError={Boolean(errorData?.relatedPostId1)}
          value={state.relatedPostId1}
          disabled={shouldDisableInputs}
          onChange={(event) => handleOnChange(event, "relatedPostId1")}
        />
        <FormInput
          id="post-related-post-slug-2"
          label="Related post slug #2"
          description="The slug of a closely related post"
          type="string"
          placeholder="i.e. cascading-style-sheets"
          hasError={Boolean(errorData?.relatedPostId2)}
          value={state.relatedPostId2}
          disabled={shouldDisableInputs}
          onChange={(event) => handleOnChange(event, "relatedPostId2")}
        />
        <Button
          type="submit"
          variant={hasError ? "danger" : "primary"}
          className="mt-4"
          disabled={shouldDisableInputs}
        >
          {mode === "create" ? "Submit" : "Update"}
        </Button>
      </div>
      <div className="flex-1">
        <SectionSubtitle className="opacity-50">Preview:</SectionSubtitle>
        {postPreviewData?.title ? (
          <Post {...postPreviewData} />
        ) : (
          <InfoPanel type="info" title="Post preview will appear here" />
        )}
        <div className="mt-5">
          <SectionSubtitle className="opacity-50">Slug:</SectionSubtitle>
          <p>
            {appURL}/{getKebabCaseFromSentenceCase(state.fileUnder)}/
            {state.slug}
          </p>
        </div>
      </div>
    </form>
  );
};
