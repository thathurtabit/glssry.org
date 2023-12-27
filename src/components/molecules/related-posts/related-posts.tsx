import { type FC } from "react";
import type { IRelatedPosts } from "./related-posts.types";
import type { TTRPCReadPost } from "~/types/prisma.types";
import { useReadPost } from "~/hooks/post/read-post.hook";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { getTruncatedString } from "~/utils/get-truncated-string";
import { IconArchive } from "~/components/icons/archive/archive";
import { LinkText } from "~/components/atoms/link-text/link-text";
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
import { NoPostFound } from "../no-post-found/no-post-found";

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

  const postsData = [relatedPost1Data, relatedPost2Data].filter(
    (post): post is TTRPCReadPost => Boolean(post)
  );

  const isLoading = relatedPost1DataIsFetching || relatedPost2DataIsFetching;

  const postsDataNonNullable = postsData as NonNullable<TTRPCReadPost>[];

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
      ) : (
        <NoPostFound />
      )}
    </aside>
  );
};
