import type { FC } from "react";
import React from "react";
import type { IPostRowsButtons } from "./post-rows-buttons.types";
import { IconArchive } from "~/components/icons/archive/archive";
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

export const PostRowsButtons: FC<IPostRowsButtons> = ({
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
        const { fileUnder } = latestVersion ?? {};

        return (
          <li key={id} className={postRowItemStyles}>
            <button
              type="button"
              className={postRowItemClickStyles}
              onClick={() => onClickCallback(trpcPostData)}
            >
              <span className={postRowTitleStyles}>{title}</span>{" "}
              <small
                title={`Filed under: ${fileUnder}`}
                className={postRowItemMetaStyles}
              >
                <IconArchive />
                {fileUnder}
              </small>
            </button>
          </li>
        );
      })}
    </ul>
  ) : (
    <p className={postRowNoItemsStyles}>
      <IconInfo /> No posts found
    </p>
  );
};
