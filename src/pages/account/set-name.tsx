import type { FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/organisms/account-page-wrapper/account-page-wrapper";
import { SetNameForm } from "~/components/molecules/set-name-form/set-name-form";

export const SetName: FC = () => (
  <AccountPageWrapper>
    <PageStructure removeHeaderMargin title="Set your name" width="narrow">
      <SetNameForm />
    </PageStructure>
  </AccountPageWrapper>
);

export default SetName;
