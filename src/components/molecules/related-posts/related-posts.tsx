import type { FC } from "react";
import React from "react";
import type { IRelatedPosts } from "./related-posts.types";
import { useReadPost } from "~/hooks/post/read-post.hook";
import { PostRowsLoading } from "../post-rows-loading/post-rows-loading";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import type { TTRPCReadPost } from "~/types/prisma.types";
import { getTruncatedString } from "~/utils/get-truncated-string";
import { IconArchive } from "~/components/icons/archive/archive";
import { LinkText } from "~/components/atoms/link-text/link-text";

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

  if (isLoading) {
    return <PostRowsLoading />;
  }

  if (!postsData?.length) {
    return null;
  }

  const postsDataNonNullable = postsData as NonNullable<TTRPCReadPost>[];

  return (
    <aside className="w-full lg:max-w-[250px] mt-5 md:mt-0">
      <SectionSubtitle>{title}</SectionSubtitle>
      <ul>
        {postsDataNonNullable.map(({ title, slug, versions }) => {
          const latestVersion = versions.at(-1);
          const { fileUnder, body, acronym } = latestVersion ?? {};
          return (
            <li
              key={slug}
              className="[&:not(:last-child)]:border-b-[1px] border-divider pb-2 mb-5"
            >
              <LinkText href={`/${fileUnder}/${slug}`} className="mb-2">
                <h4 className="text-md m-0">
                  {title} / {acronym}
                </h4>
              </LinkText>
              <p className="text-sm opacity-70">
                {getTruncatedString(body ?? "")}
              </p>
              <p className="flex gap-2 text-xs items-center">
                <LinkText href={`/${fileUnder}`}>
                  <IconArchive />
                  {fileUnder}
                </LinkText>
              </p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
