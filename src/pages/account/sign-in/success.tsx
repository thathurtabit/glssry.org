import type { NextPage } from "next";

import { Link } from "~/components/atoms/link/link";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { PleaseSignIn } from "~/components/atoms/please-sign-in/please-sign-in";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { useGenerateAndSetRandomUsernameOnLoad } from "~/hooks/account/generate-and-set-random-username-on-load.hook";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";

const SignInSuccess: NextPage = () => {
  const isAuthenticated = useIsAuthenticated();
  useGenerateAndSetRandomUsernameOnLoad();

  if (!isAuthenticated) {
    return <PleaseSignIn />;
  }

  return (
    <AccountPageWrapper>
      <SharedHead title="Signed In" />
      <PageStructure title="You're now signed in" width="narrow">
        <PageIntro
          textList={["Click the link below to get started"]}
          hrProps={{ position: "left" }}
        />
        <Link href="/">Home</Link>
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default SignInSuccess;
