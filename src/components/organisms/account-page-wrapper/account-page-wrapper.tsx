import type { FCC } from "~/types/react.types";
import { ModalsAndNotifications } from "../../molecules/modals-and-notifications/modals-and-notifications";
import { Fragment } from "react";

export const AccountPageWrapper: FCC = ({ children }) => (
  <Fragment>
    {children}
    <ModalsAndNotifications />
  </Fragment>
);
