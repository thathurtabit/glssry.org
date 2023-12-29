import type { FC } from "react";
import type { ICategoryRowsLinks } from "./category-rows-links.types";
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
import { getPascalCaseFromKebabCase } from "~/utils/get-pascal-case-from-kebab-case";

export const CategoryRowsLinks: FC<ICategoryRowsLinks> = ({
  isLoading,
  categoryData,
  itemsCount = 5,
  onClickCallback,
}) => {
  if (isLoading) {
    return <PostRowsLoading itemsCount={itemsCount} />;
  }

  return categoryData?.length ? (
    <ul className={postRowWrapperStyles}>
      {categoryData.map((trpcCategoryData) => {
        const [category, count] = trpcCategoryData;

        const handleLinkClick = () => {
          if (onClickCallback) {
            onClickCallback(trpcCategoryData);
          }
        };

        return category ? (
          <li key={category} className={postRowItemStyles}>
            <LinkText
              href={`${getKebabCaseFromSentenceCase(category)}`}
              className={postRowItemClickStyles}
              onClick={handleLinkClick}
            >
              <span className={postRowTitleStyles}>
                {getPascalCaseFromKebabCase(category)}
              </span>{" "}
              <small className={postRowItemMetaStyles}>{count}</small>
            </LinkText>
          </li>
        ) : null;
      })}
    </ul>
  ) : (
    <p className={postRowNoItemsStyles}>
      <IconInfo /> No categories found
    </p>
  );
};
