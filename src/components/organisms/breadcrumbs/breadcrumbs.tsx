import { useRouter } from "next/router";
import type { FC } from "react";
import React from "react";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { IconHome } from "~/components/icons/home/home";
import { EURLS } from "~/settings/constants";

export const Breadcrumbs: FC = () => {
  const route = useRouter();
  console.log({ route });
  return (
    <nav aria-label="breadcrumb" className="flex gap-2 text-sm">
      <LinkText href={EURLS.Home}>
        <IconHome />
      </LinkText>
    </nav>
  );
};
