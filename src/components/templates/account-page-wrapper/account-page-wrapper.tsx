import type { FCC } from "~/types/react.types";
import type { IAccountWrapper } from "./account-page-wrapper.types";
import React, { Fragment } from "react";
import { PleaseSignIn } from "~/components/atoms/please-sign-in/please-sign-in";
import { ModalsAndNotifications } from "~/components/molecules/modals-and-notifications/modals-and-notifications";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { PageMain } from "~/components/molecules/page-main/page-main";

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

  return (
    <Fragment>
      {children}
      <ModalsAndNotifications />
    </Fragment>
  );
};
