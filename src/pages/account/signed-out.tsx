import type { NextPage } from "next";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { Button } from "~/components/atoms/button/button";
import { signIn } from "next-auth/react";
import { EURLS } from "~/settings/constants";
import { AccountPageWrapper } from "~/components/organisms/account-page-wrapper/account-page-wrapper";
import { useIsAuthenticated } from "../../hooks/auth/is-authenticated.hook";
import { AlreadySignedIn } from "~/components/atoms/already-signed-in/already-signed-in";
import { IconPlay } from "~/components/icons/play/play";

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

  const handleSignInAgain = () => {
    (async () => {
      await signIn("sign-in-again", { callbackUrl: EURLS.SignInSuccess });
    })().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  };

  return (
    <AccountPageWrapper>
      <PageStructure title="Signed out" width="narrow">
        <PageIntro
          textList={[
            "You are now free",
            "Free to do whatever you want. Any ol' time.",
            "You can click the link below to sign in again if you wanted. No pressure.",
          ]}
          hrProps={{ position: "left" }}
        />
        <Button onClick={handleSignInAgain}>
          Join in <IconPlay />
        </Button>
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default SignedOut;
