import type { FC } from "react";
import {
  postRowItemMetaStyles,
  postRowItemStyles,
  postRowTitleStyles,
  postRowWrapperStyles,
} from "~/styles/shared";
import type { IPostRowsLoading } from "./post-rows-loading.types";

export const PostRowsLoading: FC<IPostRowsLoading> = ({ itemsCount = 5 }) => (
  <ul className={postRowWrapperStyles}>
    {Array.from({ length: itemsCount }).map((_, index) => (
      <li
        // eslint-disable-next-line react/no-array-index-key
        key={`post-row-loading-${index}`}
        className={`${postRowItemStyles} py-2 px-4 flex gap-4 animate-pulse`}
      >
        <span className={`${postRowTitleStyles} bg-background-light h-4`} />
        <span
          className={`${postRowItemMetaStyles} bg-background-light h-4 w-20`}
        />
        <span
          className={`${postRowItemMetaStyles} bg-background-light h-4 w-20`}
        />
      </li>
    ))}
  </ul>
);
