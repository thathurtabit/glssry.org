import type { ChangeEvent, FC } from "react";
import type { ITagsListProps } from "./tags-list.types";
import { Fragment, useState } from "react";
import { Button } from "~/components/atoms/button/button";
import { FormSelect } from "~/components/atoms/form-select/form-select";
import { IconPlus } from "~/components/icons/plus/plus";
import { tagKeys } from "~/schemas/post/post.schema";
import { maxTagsForPost } from "~/settings/constants";
import { IconMinus } from "~/components/icons/minus/minus";
import { removeItemFromArrayAtIndex } from "~/utils/remove-item-from-array-at-index";

export const TagsList: FC<ITagsListProps> = ({ tags, handleOnTagsChange }) => {
  const [tagsCount, setTagsCount] = useState<number>(tags.length);

  const handleOnSelect = (
    event: ChangeEvent<HTMLSelectElement>,
    changedIndex: number
  ) => {
    const updatedTags = [...tags];
    updatedTags[changedIndex] = event.target.value;
    handleOnTagsChange(updatedTags);
  };

  const handleAddRemoveTag = (type: "add" | "remove", index: number) => {
    if (type === "add") {
      if (tagsCount === maxTagsForPost) {
        return;
      }

      setTagsCount((prev) => prev + 1);
      return;
    }

    if (tagsCount === 1) {
      return;
    }

    setTagsCount((prev) => prev - 1);
    const updatedTags = removeItemFromArrayAtIndex([...tags], index);
    handleOnTagsChange(updatedTags);
  };

  return (
    <Fragment>
      {Array.from({ length: tagsCount }, (_, index) => {
        const showDisableAddTagButton = index === maxTagsForPost - 1;
        const showDisableRemoveTagButton = index === 0;
        return (
          <div
            key={`post-input-tag-${index}`}
            className="flex items-center gap-2"
          >
            <FormSelect
              id={`post-input-tag-${index}`}
              label={`Tag ${index + 1}`}
              hasError={false}
              value={tags.at(index) ?? ""}
              optionList={tagKeys}
              onChange={(event) => handleOnSelect(event, index)}
            />
            <Button
              variant="secondary"
              size="small"
              disabled={showDisableAddTagButton}
              title={
                showDisableAddTagButton
                  ? `${maxTagsForPost} tags is the maximum`
                  : "Add tag"
              }
              onClick={() => handleAddRemoveTag("add", index)}
            >
              <IconPlus />
            </Button>
            <Button
              variant="secondary"
              size="small"
              disabled={showDisableRemoveTagButton}
              title={
                showDisableRemoveTagButton
                  ? "You must have at least one tag"
                  : "Remove tag"
              }
              onClick={() => handleAddRemoveTag("remove", index)}
            >
              <IconMinus />
            </Button>
          </div>
        );
      })}
    </Fragment>
  );
};
