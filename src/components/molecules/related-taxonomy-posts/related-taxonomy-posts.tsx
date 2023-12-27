import { type FC } from "react";
import type { TTRPCReadPost } from "~/types/prisma.types";
import type { IRelatedTaxonomyPosts } from "./related-taxonomy-posts.types";
import type { TNativeTag } from "~/schemas/post/post.schema";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { getTruncatedString } from "~/utils/get-truncated-string";
import { IconArchive } from "~/components/icons/archive/archive";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { useReadRandomisedRelatedPosts } from "~/hooks/post/read-randomised-related-posts.hook";
import {
  relatedPostLinkStyles,
  relatedPostLinkTitleStyles,
  relatedPostsBodyStyles,
  relatedPostsCategoryStyles,
  relatedPostsLIStyles,
  relatedPostsULStyles,
} from "~/styles/shared";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
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
      <SectionSubtitle>{title}</SectionSubtitle>
      {isLoading ? (
        <RelatedPostsLoading />
      ) : postsDataNonNullable.length ? (
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
                  <h4 className={relatedPostLinkTitleStyles}>
                    {title} / {acronym}
                  </h4>
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
      ) : null}
    </aside>
  );
};
