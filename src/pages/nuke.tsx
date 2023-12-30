import { Fragment, type FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { EURLS } from "~/settings/constants";
import { Breadcrumbs } from "~/components/organisms/breadcrumbs/breadcrumbs";
import { LinkText } from "~/components/atoms/link-text/link-text";

export const Nuke: FC = () => (
  <Fragment>
    <SharedHead title="Nuke" />
    <Breadcrumbs />
    <PageStructure title="Nuke" width="narrow" justifyContent="start">
      <PageMainIndent>
        <p>
          Please visit <LinkText href={EURLS.Nuke}>this page</LinkText> if you
          want to delete any personal information that you have provided, i.e.
          your email address during social sign-in.
        </p>
      </PageMainIndent>
    </PageStructure>
  </Fragment>
);

export default Nuke;
