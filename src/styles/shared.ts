// INFO PANEL
export const infoPanelWrapper = `min-['600px']: my-4 max-w-sm flex-col justify-start rounded-lg px-5 py-3 pb-4`;
export const infoPanelHeading = `mb-1 font-sub-heading flex flex-row items-center justify-start`;
export const infoPanelBody = `text-sm font-body`;

// FORM INPUTS
export const inputWrapperClasses = "mb-4 flex w-full flex-col";
export const inputLabelClasses = "font-medium";
export const inputDescriptionClasses = "inline mb-3 max-w-sm opacity-70";
export const inputSizeWrapperDefaultClasses = "text-base";
export const inputSizeWrapperSmallClasses = "text-sm";
export const inputSizeDefaultClasses = "rounded-xs p-2";
export const inputSizeSmallClasses = "rounded-xs p-1";

export const errorMessageClasses =
  "mt-1 mb-0 inline py-1 text-xs font-medium text-error";

export const getSizeClasses = (size: string) => {
  switch (size) {
    case "small":
      return inputSizeSmallClasses;
    default:
      return inputSizeDefaultClasses;
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
