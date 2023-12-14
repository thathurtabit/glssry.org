import type { NextPage } from "next";
import { Link } from "~/components/atoms/link/link";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { useRouter } from "next/router";
import { EURLS } from "~/settings/constants";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { AlreadySignedIn } from "~/components/atoms/already-signed-in/already-signed-in";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";

const getSignInError = (error: string) => {
  switch (error) {
    case "Configuration": {
      return "There was an error with the server configuration";
    }

    case "AccessDenied": {
      return "You do not have access to this resource";
    }

    case "Verification": {
      return "The sign-in token has expired or has already been used";
    }

    default: {
      return "There was an error signing in";
    }
  }
};

const SignInError: NextPage = () => {
  const { query } = useRouter();
  const isAuthenticated = useIsAuthenticated();

  const signInError = query?.error
    ? getSignInError(query.error as string)
    : null;

  if (isAuthenticated && !signInError) {
    return <AlreadySignedIn />;
  }

  return (
    <AccountPageWrapper>
      <SharedHead title="Sign In Error" />
      <PageStructure title="Sign in error" width="narrow">
        <PageIntro
          textList={["Oh heck no.", `${signInError} 😢`]}
          hrProps={{ position: "left" }}
        />
        <p className="mb-4">You can try again, perhaps:</p>
        <Link href={EURLS.SignIn}>Sign in options</Link>
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default SignInError;
