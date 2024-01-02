import React from "react";

import { PleaseSignIn } from "~/components/atoms/please-sign-in/please-sign-in";
import { PageMain } from "~/components/molecules/page-main/page-main";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import type { FCC } from "~/types/react.types";

import type { IAccountWrapper } from "./account-page-wrapper.types";

export const AccountPageWrapper: FCC<IAccountWrapper> = ({
  children,
  skipAuthCheck = false,
}) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated && !skipAuthCheck) {
    return (
      <PageMain>
        <PleaseSignIn />
      </PageMain>
    );
  }

  return children;
};
