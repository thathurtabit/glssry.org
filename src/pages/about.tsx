import { Fragment, type FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { appTitle, githubRepoURL } from "~/settings/constants";
import { Breadcrumbs } from "~/components/organisms/breadcrumbs/breadcrumbs";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { IconGithub } from "~/components/icons/github/github";

export const About: FC = () => (
  <Fragment>
    <SharedHead title="About" />
    <Breadcrumbs />
    <PageStructure title="About" width="narrow" justifyContent="start">
      <PageMainIndent>
        <p>
          {appTitle} is a free, open-source, educational, &apos;meta&apos; site
          which intends to give users an easy to understand glossary of terms
          used across a range of different subject matters.
        </p>
        <p>
          {appTitle} is not responsible for the content of external sites, and
          is meant as a starting point for further research.
        </p>
        <p>
          As {appTitle} is an open-source project, it allows contributions from
          everyone, and the source code behind the project is available via the
          link below:
        </p>
        <p>
          <LinkText
            href={githubRepoURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github repository <IconGithub />
          </LinkText>
        </p>
      </PageMainIndent>
    </PageStructure>
  </Fragment>
);

export default About;
