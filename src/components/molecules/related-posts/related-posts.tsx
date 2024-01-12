import { type FC } from "react";

import { EditThisPost } from "~/components/atoms/edit-this-post/edit-this-post";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { IconArchive } from "~/components/icons/archive/archive";
import { useReadPost } from "~/hooks/post/read-post.hook";
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

import type { IRelatedPosts } from "./related-posts.types";

import { NoPostFound } from "../no-post-found/no-post-found";
import { RelatedPostsLoading } from "../related-posts-loading/related-posts-loading";

export const RelatedPosts: FC<IRelatedPosts> = ({
  title = "Related terms",
  slugs,
}) => {
  const {
    postData: relatedPost1Data,
    postDataIsFetching: relatedPost1DataIsFetching,
  } = useReadPost({ slug: slugs.at(0) ?? "" });
  const {
    postData: relatedPost2Data,
    postDataIsFetching: relatedPost2DataIsFetching,
  } = useReadPost({ slug: slugs.at(1) ?? "" });

  const postsData = [relatedPost1Data, relatedPost2Data]
    .filter(Boolean)
    .filter(
      (relatedPost): relatedPost is NonNullable<typeof relatedPost> =>
        relatedPost !== null
    );

  const isLoading = relatedPost1DataIsFetching || relatedPost2DataIsFetching;

  const postsDataNonNullable = postsData;

  return (
    <aside className="w-full md:max-w-xs mt-5 md:mt-0">
      <SectionSubtitle headingLevel="h2">{title}</SectionSubtitle>
      {isLoading ? (
        <RelatedPostsLoading />
      ) : postsDataNonNullable && postsDataNonNullable.length > 0 ? (
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
