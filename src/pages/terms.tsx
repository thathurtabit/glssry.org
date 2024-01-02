import { Fragment, type FC } from "react";

import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { Breadcrumbs } from "~/components/organisms/breadcrumbs/breadcrumbs";
import { appTitle } from "~/settings/constants";

export const Terms: FC = () => (
  <Fragment>
    <SharedHead title="Terms" />
    <Breadcrumbs />
    <PageStructure title="Terms" width="narrow" justifyContent="start">
      <PageMainIndent>
        <p>
          {appTitle} is a free, open-source, educational, &apos;meta&apos; site
          which intends to give users an easy to understand glossary of terms
          used across a range of different subject matters.
        </p>
        <p>
          Users gain a basic understand of a particular term, then can choose to
          investigate further by clicking on the link provided to learn more;
          this will link to another site with an authoritative insight on the
          chosen term.
        </p>
        <p>
          {appTitle} is not responsible for the content of external sites, and
          is meant as a starting point for further research.
        </p>
      </PageMainIndent>
    </PageStructure>
  </Fragment>
);

export default Terms;
