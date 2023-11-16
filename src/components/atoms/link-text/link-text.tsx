import type { FCC } from "~/types/react.types";
import type { ILinkText } from "./link-text.types";
import { textClickClasses } from "../button-text/button-text";
import NextLink from "next/link";

export const LinkText: FCC<ILinkText> = ({
  href,
  inverse,
  children,
  className,
  ...rest
}) => {
  const coreClasses = inverse
    ? textClickClasses.inverse
    : textClickClasses.default;
  return (
    <NextLink href={href} className={`${coreClasses} ${className}`} {...rest}>
      {children}
    </NextLink>
  );
};
