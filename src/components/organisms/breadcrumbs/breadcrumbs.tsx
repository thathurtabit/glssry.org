import { Fragment, type FC } from "react";
import type { IBreadcrumbs } from "./breadcrumbs.types";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { IconHome } from "~/components/icons/home/home";
import { EURLS } from "~/settings/constants";
import { replaceAll } from "~/utils/replace-all";

export const Breadcrumbs: FC<IBreadcrumbs> = ({ items }) => {
  if (!items) {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumb"
      className="flex gap-2 py-3 px-5 text-xs max-w-full"
    >
      <LinkText href={EURLS.Home}>
        <IconHome className="opacity-50" />
      </LinkText>
      {items.map((pathSection, index) => {
        const isLastItem = index === items.length - 1;
        const href = `/${items.slice(0, index + 1).join("/")}`;
        return (
          <Fragment key={pathSection}>
            <span className="text-border">/</span>
            <LinkText
              href={href}
              className="truncate opacity-50 text-ellipsis overflow-hidden inline-block"
              {...(isLastItem ? { "aria-current": "page" } : null)}
            >
              {replaceAll(pathSection, "-", " ").toLowerCase()}
            </LinkText>
          </Fragment>
        );
      })}
    </nav>
  );
};
