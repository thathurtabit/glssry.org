import type { FC } from "react";

import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SetUsernameForm } from "~/components/molecules/set-username-form/set-username-form";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";

export const SetUsername: FC = () => (
  <AccountPageWrapper>
    <SharedHead title="Set Username" />
    <PageStructure title="Set Username" width="narrow">
      <SetUsernameForm />
    </PageStructure>
  </AccountPageWrapper>
);

export default SetUsername;
