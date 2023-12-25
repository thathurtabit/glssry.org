import type { FC } from "react";
import type { IPostRowsLinks } from "./post-rows-links.types";
import { IconInfo } from "~/components/icons/info/info";
import {
  postRowItemClickStyles,
  postRowItemMetaStyles,
  postRowItemStyles,
  postRowNoItemsStyles,
  postRowTitleStyles,
  postRowWrapperStyles,
} from "~/styles/shared";
import { PostRowsLoading } from "../post-rows-loading/post-rows-loading";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";

export const PostRowsLinks: FC<IPostRowsLinks> = ({
  isLoading,
  postsData,
  onClickCallback,
}) => {
  if (isLoading) {
    return <PostRowsLoading />;
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
    <p className={postRowNoItemsStyles}>
      <IconInfo /> No posts found
    </p>
  );
};
