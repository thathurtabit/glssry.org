import { type FC } from "react";

import { LinkText } from "~/components/atoms/link-text/link-text";
import {
  postRowItemClickStyles,
  postRowItemMetaStyles,
  postRowItemStyles,
  postRowTitleStyles,
  postRowWrapperStyles,
} from "~/styles/shared";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";

import type { IPostRowsLinks } from "./post-rows-links.types";
import { NoPostFound } from "../no-post-found/no-post-found";
import { PostRowsLoading } from "../post-rows-loading/post-rows-loading";

export const PostRowsLinks: FC<IPostRowsLinks> = ({
  isLoading,
  postsData,
  itemsCount = 5,
  onClickCallback,
}) => {
  if (isLoading) {
    return <PostRowsLoading itemsCount={itemsCount} />;
  }

  return postsData?.length ? (
    <ul className={postRowWrapperStyles}>
      {postsData.map((trpcPostData) => {
        const { id, title, versions } = trpcPostData;
        const latestVersion = versions.at(-1);
        const { fileUnder, acronym, slug } = latestVersion ?? {};

        const handleLinkClick = () => {
          if (onClickCallback) {
            onClickCallback(trpcPostData);
          }
        };

        return slug && fileUnder ? (
          <li key={id} className={postRowItemStyles}>
            <LinkText
              href={`${getKebabCaseFromSentenceCase(fileUnder)}/${slug}`}
              className={postRowItemClickStyles}
              onClick={handleLinkClick}
            >
              <span className={postRowTitleStyles}>{title}</span>{" "}
              <small className={postRowItemMetaStyles}>{acronym}</small>
            </LinkText>
          </li>
        ) : null;
      })}
    </ul>
  ) : (
    <NoPostFound />
  );
};
