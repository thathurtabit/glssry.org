import type { FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";

export const Nuke: FC = () => (
  <AccountPageWrapper>
    <SharedHead title="Nuke" />
    <PageStructure title="Nuke" width="narrow" justifyContent="start">
      <PageMainIndent>Nuke</PageMainIndent>
    </PageStructure>
  </AccountPageWrapper>
);

export default Nuke;
