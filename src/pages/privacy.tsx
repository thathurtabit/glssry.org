import { Fragment, type FC } from "react";

import { LinkText } from "~/components/atoms/link-text/link-text";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { Breadcrumbs } from "~/components/organisms/breadcrumbs/breadcrumbs";
import { EURLS, appTitle } from "~/settings/constants";

export const Privacy: FC = () => (
  <Fragment>
    <SharedHead title="Privacy" />
    <Breadcrumbs />
    <PageStructure title="Privacy" width="narrow" justifyContent="start">
      <PageMainIndent>
        <p>
          {appTitle} does not keep any private information other than what is
          provided by the user during social sign-in.
        </p>
        <p>
          If an email is provided during social sign-in, it will never be shared
          with 3rd parties and will never be made public - it is only used as a
          mechanism to authenticate an editor/admin.
        </p>
        <p>
          If you want to remove any personal information you provided when you
          signed in - you can visit{" "}
          <LinkText href={EURLS.Nuke}>this page</LinkText>.
        </p>
      </PageMainIndent>
    </PageStructure>
  </Fragment>
);

export default Privacy;
