import type { FCC } from "~/types/react.types";

import type { IButtonText } from "./button-text.types";

export const sharedTextClasses =
  "relative font-body font-medium items-center gap-1";
export const sharedTextUnderlineClasses =
  "relative after:bg-action after:transition-transform after:absolute after:content-[''] inline-flex after:left-0 after:bottom-0 after:w-full after:scale-x-0 after:h-[1px] after:origin-bottom-right after:ease-in-out";
export const sharedTextUnderlineClassesHover =
  "hover:after:scale-x-100 hover:after:origin-bottom-left";

export const textClickClasses = {
  inverse: `${sharedTextClasses} ${sharedTextUnderlineClasses}  ${sharedTextUnderlineClassesHover} text-copy-inverse after:bg-copy-inverse`,
  default: `${sharedTextClasses} ${sharedTextUnderlineClasses} ${sharedTextUnderlineClassesHover} text-action after:bg-action`,
};

export const ButtonText: FCC<IButtonText> = ({
  onClick,
  inverse,
  children,
  className,
  ...rest
}) => {
  const coreClasses = inverse
    ? textClickClasses.inverse
    : textClickClasses.default;
  return (
    <button
      type="button"
      className={`${coreClasses} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
