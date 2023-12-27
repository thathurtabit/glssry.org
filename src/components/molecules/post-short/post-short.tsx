import type { FC } from "react";
import type { IPostShort } from "./post-short.types";
import React from "react";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { getTruncatedString } from "~/utils/get-truncated-string";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { PostShortLoading } from "../post-short-loading/post-short-loading";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";

export const PostShort: FC<IPostShort> = ({
  postTitle = "Random term",
  isLoading,
  postData,
  className,
}) => {
  const { versions } = postData ?? {};
  const latestVersion = versions?.at(-1);

  if (!latestVersion && !isLoading) {
    return (
      <InfoPanel title="No post found" type="info">
        Hmm, strangely, we couldn&apos;t find any posts to show!
      </InfoPanel>
    );
  }

  if (!latestVersion) {
    return null;
  }

  const { abbreviation, acronym, body, fileUnder, initialism, title, slug } =
    latestVersion;

  const smallTextStyles = "text-[0.5rem] opacity-50 uppercase";

  if (isLoading) {
    return <PostShortLoading />;
  }

  return (
    <article className={`text-copy w-full max-w-4xl mb-9 ${className ?? ""}`}>
      <SectionSubtitle>{postTitle}</SectionSubtitle>
      <h2 className="mb-4 md:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        <LinkText
          href={`/${getKebabCaseFromSentenceCase(fileUnder)}/${slug}`}
          className="font-heading"
        >
          {title ?? "Title not found"}
        </LinkText>
      </h2>
      <div className="flex flex-col lg:flex-row gap-3 md:gap-5">
        <div className="flex-1 w-full">
          <p className="md:text-lg mb-2">
            {body ? getTruncatedString(body, 150) : "Body..."}
          </p>
          <dl className="flex gap-5 my-2 md:my-2">
            <div>
              <dt className={`${smallTextStyles} mb-0`}>Abbreviation:</dt>
              <dd>{abbreviation ?? "-"}</dd>
            </div>
            <div>
              <dt className={`${smallTextStyles} mb-0`}>Acronym:</dt>
              <dd>{acronym ?? "-"}</dd>
            </div>
            <div>
              <dt className={`${smallTextStyles} mb-0`}>Initialism:</dt>
              <dd>{initialism ?? "-"}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
};
