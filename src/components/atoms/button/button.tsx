import type { FC } from "react";

import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { IconError } from "~/components/icons/error/error";
import { IconGoBack } from "~/components/icons/go-back/go-back";
import { IconGoForward } from "~/components/icons/go-forward/go-forward";
import { IconPlay } from "~/components/icons/play/play";
import { IconReset } from "~/components/icons/reset/reset";
import { IconStop } from "~/components/icons/stop/stop";
import type { TButtonVariant } from "~/types/common.types";

import type { IButton, TButtonSize } from "./button.types";

export const getButtonSizeClasses = (size: TButtonSize) => {
  switch (size) {
    case "large": {
      return `p-2.5 px-5 text-md font-medium gap-3`;
    }

    case "small": {
      return `p-1.5 px-2.5 text-xs font-medium gap-1`;
    }

    default: {
      return `p-1.5 px-3.5 text-sm font-medium gap-1.5`;
    }
  }
};

export const getButtonVariantClasses = (variant: TButtonVariant) => {
  switch (variant) {
    case "primary": {
      return "border-2 border-primary bg-primary text-copy-inverse [&:not(:disabled)]:hover:bg-primary-dark [&:not(:disabled)]:hover:border-primary-dark disabled:opacity-50";
    }

    case "secondary": {
      return "border-2 border-primary bg-secondary text-copy border-copy [&:not(:disabled)]:hover:bg-secondary-light [&:not(:disabled)]:hover:border-primary disabled:opacity-50";
    }

    case "danger": {
      return "bg-error text-white [&:not(:disabled)]:hover:bg-error-dark";
    }

    default: {
      return "bg-action text-copy-inverse [&:not(:disabled)]:hover:bg-action-dark";
    }
  }
};

export const coreButtonStyles =
  "font-sub-heading inline-flex items-center rounded-full transition whitespace-nowrap drop-shadow-button";

export const getLoadingIconSize = (size: TButtonSize) =>
  size === "small" ? 13 : (size === "medium" ? 14 : 16);
export const getErrorIconSize = (size: TButtonSize) =>
  size === "small" ? 16 : (size === "medium" ? 18 : 22);
export const getNextPreviousIconSize = (size: TButtonSize) =>
  size === "small" ? 13 : (size === "medium" ? 14 : 16);
// Note: the below is assuming these icons are 'rounded' shape
export const getResetIconSize = (size: TButtonSize) =>
  size === "small" ? "25" : (size === "medium" ? "30" : "40");
export const getPlayIconSize = (size: TButtonSize) =>
  size === "small" ? "25" : (size === "medium" ? "30" : "40");
export const getStopIconSize = (size: TButtonSize) =>
  size === "small" ? "25" : (size === "medium" ? "30" : "40");

export const Button: FC<IButton> = ({
  title,
  variant = "primary",
  size = "medium",
  shape = "lozenge",
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
      ? "drop-shadow-timer [&:not(:disabled)]:active:drop-shadow-timer-active [&:not(:disabled)]:active:translate-x-1 [&:not(:disabled)]:active:translate-y-1"
      : "drop-shadow-button [&:not(:disabled)]:active:drop-shadow-button-active [&:not(:disabled)]:active:translate-x-1 [&:not(:disabled)]:active:translate-y-1";
  const buttonSizeClasses = getButtonSizeClasses(size);
  const variantClasses = getButtonVariantClasses(variant);
  const content = hasError ? (iconOnly ? <IconError /> : errorText) : children;
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
       
      type={type}
      className={`transition-all ${dropShadowClasses} ${
        hasError ? errorClasses : variantClasses
      } ${buttonSizeClasses} ${
        className ?? ""
      } ${buttonShapeClasses} ${coreButtonStyles} ${
        loading || disabled ? "cursor-not-allowed" : ""
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
