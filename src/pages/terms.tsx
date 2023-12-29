import type { FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";

export const Terms: FC = () => (
  <AccountPageWrapper>
    <SharedHead title="Terms" />
    <PageStructure title="Terms" width="narrow" justifyContent="start">
      <PageMainIndent>Terms and conditions</PageMainIndent>
    </PageStructure>
  </AccountPageWrapper>
);

export default Terms;
