import { type FC } from "react";

import { EditThisPost } from "~/components/atoms/edit-this-post/edit-this-post";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { IconArchive } from "~/components/icons/archive/archive";
import {
  relatedPostLinkStyles,
  relatedPostLinkTitleStyles,
  relatedPostsBodyStyles,
  relatedPostsCategoryStyles,
  relatedPostsLIStyles,
  relatedPostsULStyles,
} from "~/styles/shared";

import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { getTruncatedString } from "~/utils/get-truncated-string";

import type { IRelatedPosts } from "./random-posts.types";

import { NoPostFound } from "../no-post-found/no-post-found";

export const RandomPosts: FC<IRelatedPosts> = ({
  title = "Other posts",
  randomisedPosts,
}) => {
  if (!randomisedPosts) {
    return null;
  }

  const postsData = randomisedPosts
    .filter(Boolean)
    .filter(
      (relatedPost): relatedPost is NonNullable<typeof relatedPost> =>
        relatedPost !== null
    );

  const postsDataNonNullable = postsData;

  return (
    <aside className="w-full md:max-w-xs mt-5 md:mt-0">
      <SectionSubtitle headingLevel="h2">{title}</SectionSubtitle>
      {postsDataNonNullable && postsDataNonNullable.length > 0 ? (
        <ul className={relatedPostsULStyles}>
          {postsDataNonNullable.map(({ title, slug, versions }) => {
            const latestVersion = versions.at(-1);
            const { fileUnder, body, acronym, abbreviation } =
              latestVersion ?? {};
            const kebabCaseFileUnder = getKebabCaseFromSentenceCase(
              fileUnder ?? ""
            );
            const shortedTitle = abbreviation ?? acronym;
            return (
              <li key={slug} className={relatedPostsLIStyles}>
                <LinkText
                  href={`/${kebabCaseFileUnder}/${slug}`}
                  className={relatedPostLinkStyles}
                >
                  <h3 className={relatedPostLinkTitleStyles}>
                    {title} {shortedTitle ? `/ ${shortedTitle}` : null}
                  </h3>
                </LinkText>
                <p className={relatedPostsBodyStyles}>
                  {getTruncatedString(body ?? "")}
                </p>
                {fileUnder ? (
                  <p className={relatedPostsCategoryStyles}>
                    <LinkText href={`/${kebabCaseFileUnder}`}>
                      <IconArchive />
                      {fileUnder}
                    </LinkText>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <NoPostFound />
      )}
      <EditThisPost />
    </aside>
  );
};
