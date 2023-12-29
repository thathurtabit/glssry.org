import { Fragment, type FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";

export const Terms: FC = () => (
  <Fragment>
    <SharedHead title="Terms" />
    <PageStructure title="Terms" width="narrow" justifyContent="start">
      <PageMainIndent>Terms and conditions</PageMainIndent>
    </PageStructure>
  </Fragment>
);

export default Terms;
