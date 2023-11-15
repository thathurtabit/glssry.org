import type { FCC } from "~/types/react.types";
import type { IPageStructure } from "./page-structure.types";
import { Fragment } from "react";
import { PageHeader } from "~/components/atoms/page-header/page-header";
import { PageBody } from "../page-body/page-body";
import { PageContent } from "../page-content/page-content";
import { PageMain } from "../page-main/page-main";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { PleaseSignIn } from "~/components/atoms/please-sign-in/please-sign-in";
import { SharedHead } from "../shared-head/shared-head";

export const PageStructure: FCC<IPageStructure> = ({
  preTitle,
  title,
  TitleIcon,
  showTitle = true,
  children,
  requiresAuthentication = false,
  justifyContent = "center",
  width = "full",
  removeHeaderMargin = false,
  isLoading = false,
}) => {
  const isAuthenticated = useIsAuthenticated();
  const shouldShowLogInRequest = requiresAuthentication && !isAuthenticated;

  return (
    <Fragment>
      <SharedHead title={title} />
      <PageMain justifyContent={justifyContent}>
        {isLoading ? (
          <PageContent width={width}>
            <span className="animate-pulse inline-block w-20 h-5 mb-2 bg-black/20" />
            <span className="animate-pulse inline-block w-60 h-14 mb-5 bg-black/20" />
            {Array.from({ length: 7 }, (_, index) => (
              <span
                key={`loading-${index}`}
                className="animate-pulse inline-block max-w-md h-10 mb-2 bg-black/20"
              />
            ))}
          </PageContent>
        ) : (
          <PageContent width={width}>
            {showTitle && (
              <PageHeader
                removeMargin={removeHeaderMargin}
                preText={preTitle}
                text={title}
                TitleIcon={TitleIcon}
              />
            )}
            {shouldShowLogInRequest && <PleaseSignIn />}
            {!shouldShowLogInRequest && <PageBody>{children}</PageBody>}
          </PageContent>
        )}
      </PageMain>
    </Fragment>
  );
};
