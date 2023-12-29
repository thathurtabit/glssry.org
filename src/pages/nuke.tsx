import { Fragment, type FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";

export const Nuke: FC = () => (
  <Fragment>
    <SharedHead title="Nuke" />
    <PageStructure title="Nuke" width="narrow" justifyContent="start">
      <PageMainIndent>Nuke</PageMainIndent>
    </PageStructure>
  </Fragment>
);

export default Nuke;
