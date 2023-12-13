import type { NextPage } from "next";
import { Link } from "~/components/atoms/link/link";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { PleaseSignIn } from "~/components/atoms/please-sign-in/please-sign-in";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { useGenerateAndSetRandomUsernameOnLoad } from "~/hooks/account/generate-and-set-random-username-on-load.hook";

const SignInSuccess: NextPage = () => {
  const isAuthenticated = useIsAuthenticated();
  useGenerateAndSetRandomUsernameOnLoad();

  if (!isAuthenticated) {
    return <PleaseSignIn />;
  }

  return (
    <AccountPageWrapper>
      <PageStructure title="Sign in success!" width="narrow">
        <PageIntro
          textList={[
            "You are now signed in!",
            "Click the link below to get started",
          ]}
          hrProps={{ position: "left" }}
        />
        <Link href="/">Home&apos;</Link>
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default SignInSuccess;
