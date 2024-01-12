import { useReducer, Fragment, useState } from "react";
import type { FormEvent, FC } from "react";

import { Button } from "~/components/atoms/button/button";
import { FormInput } from "~/components/atoms/form-input/form-input";

import { FormSelect } from "~/components/atoms/form-select/form-select";
import { FormTextarea } from "~/components/atoms/form-textarea/form-textarea";

import { HorizontalRule } from "~/components/atoms/horizontal-rule/horizontal-rule";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import { Link } from "~/components/atoms/link/link";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { IconExternalLink } from "~/components/icons/external-link/external-link";
import { IconInfo } from "~/components/icons/info/info";
import { IconThumb } from "~/components/icons/thumb/thumb";
import { Post } from "~/components/molecules/post/post";
import { useIsEditor } from "~/hooks/auth/is-editor.hook";
import { useNewPostEmail } from "~/hooks/email/new-post-email.hook";
import { useCreatePost } from "~/hooks/post/create-post.hook";
import { useFormValidation } from "~/hooks/post/form-validation.hook";
import { useSearchPublishedPosts } from "~/hooks/post/search-published-posts.hook";
import { useUpdatePost } from "~/hooks/post/update-post.hook";
import {
  postSchema,
  tagsKeysWithSelectInstruction,
} from "~/schemas/post/post.schema";
import type { TPost, TPostKeys } from "~/schemas/post/post.schema";
import { EURLS, appTitle, appURL } from "~/settings/constants";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { getTRPCPostFormat } from "~/utils/get-trpc-post-format";

import { TagsList } from "./children/tags-list/tags-list";

import type { IPostEntryForm, TPostEntryEvent } from "./post-entry-form.types";
import { postReducer } from "./reducer/form.reducer";
import { initState } from "./reducer/init-state";
import { formStateTransform } from "./utils/form-state-transform.util";

export const PostEntryForm: FC<IPostEntryForm> = ({
  postId,
  mode,
  postData,
}) => {
  const reducerState = postData ?? initState;
  const [hasSubmittedTitleCheck, setHasSubmittedTitleCheck] = useState(false);
  const [showRelated, setShowRelated] = useState(false);
  const [state, dispatch] = useReducer(postReducer, reducerState);
  const [postSuccessful, setPostSuccessful] = useState(false);
  const [userHasSaidPostIsNotDuplicate, setUserHasSaidPostIsNotDuplicate] =
    useState(false);
  const isEditor = useIsEditor();

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
    state.title &&
      searchedPublishedPostsData?.length &&
      userHasSaidPostIsNotDuplicate === false
  );

  const isOKToShowFullForm =
    mode === "edit" ||
    (state.title &&
      (!searchedPublishedPostsData?.length || userHasSaidPostIsNotDuplicate) &&
      hasSubmittedTitleCheck &&
      !searchedPublishedPostsDataIsFetching);

  const { newPostEmailMutation } = useNewPostEmail();

  const { createPostMutation, createPostMutationIsLoading } = useCreatePost({
    onSuccessCallback() {
      setPostSuccessful(true);
      // If not editor or admin, send notification email to admin
      if (isEditor) {
        newPostEmailMutation({
          title: state.title,
          fileUnder: state.fileUnder,
          body: state.body,
        });
      }
    },
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
      createPostMutation(formStateTransform(state));
      return;
    }

    if (mode === "edit" && postId) {
      updatePostMutation({
        postId,
        data: formStateTransform(state),
      });
    }
  };

  const handleResetForm = () => {
    dispatch({ type: "reset", payload: initState });
    setPostSuccessful(false);
  };

  const handleUserHasSaidPostIsNotDuplicate = () => {
    setUserHasSaidPostIsNotDuplicate(true);
  };

  const handleShowRelated = () => {
    setShowRelated(!showRelated);
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
    return (
      <Fragment>
        <SectionSubtitle className="flex items-center gap-2">
          <IconInfo /> Hmm, we&apos;ve found similar posts
        </SectionSubtitle>

        <p>
          It looks like there are already posts with similar titles to &ldquo;
          {}
          <strong>{state.title}</strong>&rdquo; which you&apos;re trying to
          create.
        </p>

        <HorizontalRule position="left" />
        <div className="flex gap-5">
          <div className="flex-1">
            <SectionSubtitle>Similar posts</SectionSubtitle>
            <p>
              Please check the below posts to see if they&apos;re the same as
              the one you&apos;re trying to create.
            </p>
            <ul className="list-disc m-4">
              {searchedPublishedPostsData?.map((post) => {
                const { versions, title, id } = post;
                const latestVersion = versions?.at(-1);
                const { fileUnder, slug } = latestVersion ?? {};

                return (
                  <li key={id}>
                    <LinkText
                      href={`/${getKebabCaseFromSentenceCase(
                        fileUnder ?? ""
                      )}/${slug}`}
                      target="_blank"
                    >
                      {title} <IconExternalLink />
                    </LinkText>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex-1">
            <SectionSubtitle>My post is not a duplication</SectionSubtitle>
            <p>
              If you&apos;ve checked the list of similar posts and you&apos;re
              sure your post is not a duplication, please click the button below
              to continue.
            </p>
            <Button
              disabled={disablePreliminaryPostTitleSearch}
              variant="secondary"
              onClick={handleUserHasSaidPostIsNotDuplicate}
            >
              Create &ldquo;{state.title}&rdquo;
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }

  if (!isOKToShowFullForm) {
    return (
      <Fragment>
        <SectionSubtitle className="flex items-center gap-1">
          Firstly, let&apos;s check if this post already exists
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
          disabled={mode === "create"} // We disable this as the entry is created from the preliminary title check
          id="post-input-title"
          label="Post title"
          placeholder="i.e. Cascading Style Sheets"
          description={
            mode === "create"
              ? "Title can't be edited after the preliminary check"
              : undefined
          }
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
          disabled={shouldDisableInputs}
          modalData={{
            title: "Acronym",
            type: "small",
            content: (
              <p>
                An acronym is an abbreviation formed from the initial letters of
                other words and pronounced as a word (e.g. ASCII, NASA).
              </p>
            ),
          }}
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
          modalData={{
            title: "Abbreviation",
            type: "small",
            content: (
              <Fragment>
                <p>
                  An abbreviation is a shortened form of a written word or
                  phrase used in place of the whole word or phrase
                </p>
                <p>
                  For example: <strong>amt.</strong> is an abbreviation for{" "}
                  <strong>amount</strong>.
                </p>
              </Fragment>
            ),
          }}
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
          modalData={{
            title: "Initialism",
            type: "small",
            content: (
              <Fragment>
                <p>
                  An initialism is an abbreviation consisting of the first
                  letters of each word in the name of something, pronounced as
                  separate letters.
                </p>
                <p>
                  For example: <strong>HTML</strong> is an initialism of:{" "}
                  <strong>HyperText Markup Language</strong>
                </p>
              </Fragment>
            ),
          }}
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
        <HorizontalRule position="left" />
        <Button size="small" onClick={handleShowRelated}>
          {showRelated ? "Hide" : "Show"} related terms inputs
        </Button>
        {showRelated ? (
          <div className="mt-8">
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
          </div>
        ) : null}
        <HorizontalRule position="left" />
        <Button
          type="submit"
          variant={hasError ? "danger" : "primary"}
          className="mt-4"
          disabled={shouldDisableInputs}
        >
          {mode === "create" ? "Submit" : "Update"}
        </Button>
      </div>
      <div className="flex-1 relative">
        <div className="sticky top-header">
          <SectionSubtitle className="opacity-50">Preview:</SectionSubtitle>
          {postPreviewData?.title ? (
            <Post postData={postPreviewData} showRelatedPosts={false} />
          ) : (
            <InfoPanel type="info" title="Post preview will appear here" />
          )}
          <div className="mt-5">
            <SectionSubtitle className="opacity-50">Slug:</SectionSubtitle>
            <p>
              {appURL}/{getKebabCaseFromSentenceCase(state.fileUnder)}/
              {getKebabCaseFromSentenceCase(state.slug)}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
