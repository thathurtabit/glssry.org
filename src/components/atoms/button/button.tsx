import type { FC } from "react";
import type { TButtonVariant } from "~/types/common.types";
import type { IButton, TButtonSize } from "./button.types";
import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { IconGoBack } from "~/components/icons/go-back/go-back";
import { IconGoForward } from "~/components/icons/go-forward/go-forward";
import { IconError } from "~/components/icons/error/error";
import { IconPlay } from "~/components/icons/play/play";
import { IconStop } from "~/components/icons/stop/stop";
import { IconReset } from "~/components/icons/reset/reset";

export const getButtonSizeClasses = (
  size: TButtonSize,
  isButtonRounded = false
) => {
  switch (size) {
    case "large": {
      return `${
        isButtonRounded
          ? "p-[1rem] sm:p-[1.25rem] md:p-[1.75rem] lg:p-[2rem] text-xl"
          : "p-2.5 px-5 text-md"
      }  font-semibold gap-3`;
    }

    case "small": {
      return `${
        isButtonRounded
          ? "p-[0.75rem] sm:p-[1rem] md:p-[1.25rem] lg:p-[1.5rem]"
          : "p-1.5 px-2.5 text-xs"
      } font-semibold gap-1`;
    }

    default: {
      return `${
        isButtonRounded
          ? "p-[0.75rem] sm:p-[1rem] md:p-[1.5rem] lg:p-[1.75rem]"
          : "p-1.5 px-3.5 text-sm"
      } font-semibold gap-1.5`;
    }
  }
};

export const getButtonVariantClasses = (
  variant: TButtonVariant | "disabled"
) => {
  switch (variant) {
    case "action": {
      return "text-white bg-action border-2 border-action text-copy-inverse [&:not(:disabled)]:hover:border-action-dark [&:not(:disabled)]:hover:bg-action-dark";
    }

    case "action-inactive": {
      return "bg-background border-2 border-action text-copy [&:not(:disabled)]:hover:bg-action-light [&:not(:disabled)]:hover:border-action-light [&:not(:disabled)]:hover:text-white";
    }

    case "primary": {
      return "bg-primary text-copy [&:not(:disabled)]:hover:bg-primary-dark";
    }

    case "secondary": {
      return "bg-secondary text-copy text-white [&:not(:disabled)]:hover:bg-secondary-dark";
    }

    case "tertiary": {
      return "bg-tertiary text-copy [&:not(:disabled)]:hover:bg-tertiary-dark";
    }

    case "danger": {
      return "bg-error text-white [&:not(:disabled)]:hover:bg-error-dark";
    }

    case "disabled": {
      return "bg-white/25 text-white/50 cursor-not-allowed";
    }

    default: {
      return "bg-action text-copy-inverse [&:not(:disabled)]:hover:bg-action-dark";
    }
  }
};

export const coreButtonStyles =
  "font-body inline-flex items-center rounded-full transition whitespace-nowrap drop-shadow-button";

export const getLoadingIconSize = (size: TButtonSize) =>
  size === "small" ? 13 : size === "medium" ? 14 : 16;
export const getErrorIconSize = (size: TButtonSize) =>
  size === "small" ? 16 : size === "medium" ? 18 : 22;
export const getNextPreviousIconSize = (size: TButtonSize) =>
  size === "small" ? 13 : size === "medium" ? 14 : 16;
// Note: the below is assuming these icons are 'rounded' shape
export const getResetIconSize = (size: TButtonSize) =>
  size === "small" ? "25" : size === "medium" ? "30" : "40";
export const getPlayIconSize = (size: TButtonSize) =>
  size === "small" ? "25" : size === "medium" ? "30" : "40";
export const getStopIconSize = (size: TButtonSize) =>
  size === "small" ? "25" : size === "medium" ? "30" : "40";

export const Button: FC<IButton> = ({
  title,
  variant = "action",
  size = "medium",
  shape = "rounded",
  loading = false,
  type = "button",
  control,
  hasError = false,
  errorText = "Error",
  iconOnly = false,
  direction,
  className,
  children,
  disabled,
  ...rest
}) => {
  const errorClasses = "bg-error text-white hover:bg-error-dark";
  const buttonShapeClasses =
    shape === "round" ? "aspect-square" : "aspect-auto";
  const dropShadowClasses =
    shape === "round"
      ? "drop-shadow-timer [&:not(:disabled)]:active:drop-shadow-timer-active [&:not(:disabled)]:active:translate-x-2 [&:not(:disabled)]:active:translate-y-2"
      : "drop-shadow-button [&:not(:disabled)]:active:drop-shadow-button-active [&:not(:disabled)]:active:translate-x-1 [&:not(:disabled)]:active:translate-y-1";
  const isButtonRounded = shape === "round";
  const buttonSizeClasses = getButtonSizeClasses(size, isButtonRounded);
  const variantClasses = getButtonVariantClasses(
    disabled ? "disabled" : variant
  );
  const content = hasError ? iconOnly ? <IconError /> : errorText : children;
  const isPreviousButton = direction === "prev";
  const isNextButton = direction === "next";
  const resetIconSize = getResetIconSize(size);
  const playIconSize = getPlayIconSize(size);
  const stopIconSize = getStopIconSize(size);
  const loadingIconSize = getLoadingIconSize(size);
  const errorIconSize = getErrorIconSize(size);
  const nextPreviousIconSize = getNextPreviousIconSize(size);
  const controlsPlay = control === "play";
  const controlsStop = control === "stop";
  const controlsReset = control === "reset";

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`transition-all ${dropShadowClasses} ${
        hasError || controlsStop ? errorClasses : variantClasses
      } ${buttonSizeClasses} ${className} ${buttonShapeClasses} ${coreButtonStyles} ${
        loading ? "cursor-not-allowed" : ""
      }`}
      {...(title && {
        title: hasError ? errorText ?? "Ugh, there's been a problem" : title,
      })}
      disabled={loading || disabled}
      {...rest}
    >
      {controlsReset ? (
        <IconReset size={resetIconSize} />
      ) : controlsPlay ? (
        <IconPlay size={playIconSize} />
      ) : controlsStop ? (
        <IconStop size={stopIconSize} />
      ) : loading ? (
        <LoadingSpinner size={loadingIconSize} />
      ) : hasError ? (
        <IconError size={errorIconSize} />
      ) : isPreviousButton ? (
        <IconGoBack size={nextPreviousIconSize} />
      ) : isNextButton ? (
        <IconGoForward size={nextPreviousIconSize} />
      ) : (
        content
      )}
    </button>
  );
};
