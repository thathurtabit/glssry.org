import type { ChangeEvent, FC } from "react";

import { Fragment, useState } from "react";

import { Button } from "~/components/atoms/button/button";
import { FormSelect } from "~/components/atoms/form-select/form-select";
import { IconMinus } from "~/components/icons/minus/minus";
import { IconPlus } from "~/components/icons/plus/plus";
import { tagsKeysWithSelectInstruction } from "~/schemas/post/post.schema";
import { maxTagsForPost } from "~/settings/constants";
import { removeItemFromArrayAtIndex } from "~/utils/remove-item-from-array-at-index";

import type { ITagsListProperties } from "./tags-list.types";

export const TagsList: FC<ITagsListProperties> = ({
  tags,
  errorText,
  disabled,
  handleOnTagsChange,
}) => {
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

      setTagsCount((previous) => previous + 1);
      return;
    }

    if (tagsCount === 1) {
      return;
    }

    setTagsCount((previous) => previous - 1);
    const updatedTags = removeItemFromArrayAtIndex([...tags], index);
    handleOnTagsChange(updatedTags);
  };

  return (
    <Fragment>
      {Array.from({ length: tagsCount }, (_, index) => {
        const showDisableAddTagButton =
          index === maxTagsForPost - 1 || disabled;
        const showDisableRemoveTagButton = index === 0;
        return (
          <div
            key={`post-input-tag-${index}`}
            className="flex items-center gap-2"
          >
            <FormSelect
              id={`post-input-tag-${index}`}
              label={`Tag ${index + 1}`}
              {...(index === 0 && { description: "You can add up to 5 tags" })}
              hasError={Boolean(errorText)}
              errorText={errorText}
              value={tags.at(index) ?? ""}
              optionList={tagsKeysWithSelectInstruction}
              disabled={disabled}
              onChange={(event) => handleOnSelect(event, index)}
            />
            <div className="flex flex-row gap-2 mt-auto mb-6">
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
          </div>
        );
      })}
    </Fragment>
  );
};
