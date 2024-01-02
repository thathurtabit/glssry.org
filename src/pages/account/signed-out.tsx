import type { NextPage } from "next";

import { signIn } from "next-auth/react";

import { AlreadySignedIn } from "~/components/atoms/already-signed-in/already-signed-in";
import { Button } from "~/components/atoms/button/button";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { IconAccount } from "~/components/icons/account/account";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";

import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { EURLS } from "~/settings/constants";

import { useIsAuthenticated } from "../../hooks/auth/is-authenticated.hook";

const handleSignInAgain = () => {
  (async () => {
    await signIn("sign-in-again", { callbackUrl: EURLS.SignInSuccess });
  })().catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};

const SignedOut: NextPage = () => {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return (
      <AlreadySignedIn
        message={
          "Uh, you're on the 'signed-out' page, but you're still signed in!"
        }
      />
    );
  }

  return (
    <AccountPageWrapper>
      <SharedHead title="Signed Out" />
      <PageStructure title="Signed out" width="narrow">
        <PageIntro
          textList={[
            "You are now signed out",
            "You can click the link below to sign in again if you wanted. No pressure.",
          ]}
          hrProps={{ position: "left" }}
        />
        <Button onClick={handleSignInAgain}>
          Sign in <IconAccount />
        </Button>
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default SignedOut;
