import type { FC } from "react";
import type { ILink } from "./link.types";
import NextLink from "next/link";
import {
  coreButtonStyles,
  getButtonSizeClasses,
  getButtonVariantClasses,
  getNextPreviousIconSize,
} from "../button/button";
import { IconGoBack } from "~/components/icons/go-back/go-back";
import { IconGoForward } from "~/components/icons/go-forward/go-forward";

export const Link: FC<ILink> = ({
  href,
  title,
  variant = "action",
  size = "medium",
  direction,
  className,
  children,
  ...rest
}) => {
  const linkSizeClasses = getButtonSizeClasses(size);
  const variantClasses = getButtonVariantClasses(variant);
  const content = children;
  const isPreviousButton = direction === "prev";
  const isNextButton = direction === "next";
  const nextPreviousIconSize = getNextPreviousIconSize(size);

  return (
    <NextLink
      href={href}
      className={`${variantClasses} ${linkSizeClasses} ${className} ${coreButtonStyles}`}
      {...(title && {
        title,
      })}
      {...rest}
    >
      {isPreviousButton ? (
        <IconGoBack size={nextPreviousIconSize} />
      ) : (isNextButton ? (
        <IconGoForward size={nextPreviousIconSize} />
      ) : (
        content
      ))}
    </NextLink>
  );
};
