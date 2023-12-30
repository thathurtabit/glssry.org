import { Fragment, type FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { EURLS, appTitle, githubRepoURL } from "~/settings/constants";
import { Breadcrumbs } from "~/components/organisms/breadcrumbs/breadcrumbs";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { IconGithub } from "~/components/icons/github/github";
import { IconExternalLink } from "~/components/icons/external-link/external-link";
import { Link } from "~/components/atoms/link/link";
import { IconPlus } from "~/components/icons/plus/plus";
import { HorizontalRule } from "~/components/atoms/horizontal-rule/horizontal-rule";

export const Contribute: FC = () => (
  <Fragment>
    <SharedHead title="Contribute" />
    <Breadcrumbs />
    <PageStructure title="Contribute" width="narrow" justifyContent="start">
      <PageMainIndent>
        <p>
          As {appTitle} is an open-source project, it relies on contributions
          from others to improve and grow in usefulness. If you would like to
          contribute by adding terms to the database, please click the link
          below.
        </p>
        <p>
          <Link href={EURLS.CreatePost} size="small">
            Create post <IconPlus size={15} />
          </Link>
        </p>
        <HorizontalRule />
        <p>
          Or, if you&apos;d like to contribute to the codebase, please visit the
          Github repository, you can find the link below.
        </p>
        <p>
          <LinkText
            href={githubRepoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2"
          >
            Github repository <IconGithub size={18} />{" "}
            <IconExternalLink size={18} />
          </LinkText>
        </p>
      </PageMainIndent>
    </PageStructure>
  </Fragment>
);

export default Contribute;
