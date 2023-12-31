// INFO PANEL
export const infoPanelWrapper = `min-['600px']: my-4 max-w-sm flex-col justify-start rounded-lg px-5 py-3 pb-4`;
export const infoPanelHeading = `mb-1 font-sub-heading flex flex-row items-center justify-start`;
export const infoPanelBody = `text-sm font-body`;

// FORM INPUTS
export const inputWrapperClasses = "mb-4 flex w-full flex-col";
export const inputLabelClasses = "font-medium relative";
export const inputDescriptionClasses = "inline mb-3 max-w-sm opacity-70";
export const inputSizeWrapperDefaultClasses = "text-base";
export const inputSizeWrapperSmallClasses = "text-sm";
export const inputSizeDefaultClasses = "rounded-xs p-2";
export const inputSizeSmallClasses = "rounded-xs p-1";

export const errorMessageClasses =
  "mt-1 mb-0 inline py-1 text-xs font-medium text-error";

export const getSizeClasses = (size: string) => {
  switch (size) {
    case "small": {
      return inputSizeSmallClasses;
    }

    default: {
      return inputSizeDefaultClasses;
    }
  }
};

export const getInputCoreClasses = (inverse = false, hasError: boolean) => {
  if (inverse) {
    return hasError
      ? "bg-background-inverse text-error border-l-4 border-l-error"
      : "bg-background-inverse text-copy-inverse border-l-2 border-background-light";
  }

  return hasError
    ? "bg-background-light text-error border-l-4 border-l-error"
    : "bg-background-light text-copy-dark border-l-2 border-background-inverse-dark";
};

// POST ROWS
export const postRowWrapperStyles = `p-0 relative w-full flex-1`;
export const postRowItemStyles = `border-b-[1px] border-dotted border-divider gap-10`;
export const postRowItemClickStyles = `flex flex-row items-center gap-4 w-full py-1 hover:bg-background-light transition-colors`;
export const postRowTitleStyles = `flex flex-1 items-start`;
export const postRowItemMetaStyles = `ml-auto flex items-center gap-1 uppercase opacity-50 text-xs`;
export const postRowNoItemsStyles = `flex gap-2 items-center`;

// RELATED POSTS
export const relatedPostsWrapperStyles = `w-full md:w-60 mt-5 md:mt-0`;
export const relatedPostsULStyles = `flex flex-col relative gap-4`;
export const relatedPostsLIStyles = `[&:not(:last-child)]:border-b-[1px] border-divider pb-2`;
export const relatedPostLinkStyles = `mb-2 px-0 py-0`;
export const relatedPostLinkTitleStyles = `text-lg md:text-2xl m-0`;
export const relatedPostsBodyStyles = `text-sm opacity-70`;
export const relatedPostsCategoryStyles = `flex gap-2 text-xs items-center`;

