import { type FC } from "react";

import { EditThisPost } from "~/components/atoms/edit-this-post/edit-this-post";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";

import { IconArchive } from "~/components/icons/archive/archive";
import { useReadRandomisedRelatedPosts } from "~/hooks/post/read-randomised-related-posts.hook";
import type { TNativeTag } from "~/schemas/post/post.schema";
import {
  relatedPostLinkStyles,
  relatedPostLinkTitleStyles,
  relatedPostsBodyStyles,
  relatedPostsCategoryStyles,
  relatedPostsLIStyles,
  relatedPostsULStyles,
} from "~/styles/shared";
import type { TTRPCReadPost } from "~/types/prisma.types";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { getTruncatedString } from "~/utils/get-truncated-string";

import type { IRelatedTaxonomyPosts } from "./related-taxonomy-posts.types";

import { NoPostFound } from "../no-post-found/no-post-found";
import { RelatedPostsLoading } from "../related-posts-loading/related-posts-loading";

export const RelatedTaxonomyPosts: FC<IRelatedTaxonomyPosts> = ({
  title = "Other posts",
  relatedTaxonomies,
}) => {
  const { randomisedRelatedPosts, randomisedRelatedPostsIsFetching } =
    useReadRandomisedRelatedPosts({
      categories: relatedTaxonomies as TNativeTag[],
    });

  const isLoading = randomisedRelatedPostsIsFetching;

  const postsDataNonNullable =
    randomisedRelatedPosts as NonNullable<TTRPCReadPost>[];

  return (
    <aside className="w-full md:max-w-xs mt-5 md:mt-0">
      <SectionSubtitle headingLevel="h2">{title}</SectionSubtitle>
      {isLoading ? (
        <RelatedPostsLoading />
      ) : postsDataNonNullable.length > 0 ? (
        <ul className={relatedPostsULStyles}>
          {postsDataNonNullable.map(({ title, slug, versions }) => {
            const latestVersion = versions.at(-1);
            const { fileUnder, body, acronym } = latestVersion ?? {};
            const kebabCaseFileUnder = getKebabCaseFromSentenceCase(
              fileUnder ?? ""
            );
            return (
              <li key={slug} className={relatedPostsLIStyles}>
                <LinkText
                  href={`/${kebabCaseFileUnder}/${slug}`}
                  className={relatedPostLinkStyles}
                >
                  <h3 className={relatedPostLinkTitleStyles}>
                    {title} / {acronym}
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
