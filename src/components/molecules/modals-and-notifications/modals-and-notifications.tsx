import type { FC } from "react";
import { Fragment } from "react";

import { EphemeralNotifications } from "~/components/atoms/ephemeral-notifications/ephemeral-notifications";

import { ModalHub } from "../modal-hub/modal-hub";

export const ModalsAndNotifications: FC = () => (
  <Fragment>
    <ModalHub />
    <EphemeralNotifications />
  </Fragment>
);
