import { type NextPage } from "next";
import { AlreadySignedIn } from "~/components/atoms/already-signed-in/already-signed-in";
import { Link } from "~/components/atoms/link/link";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { EURLS } from "~/settings/constants";

const SignInMagicLink: NextPage = () => {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <AlreadySignedIn />;
  }

  return (
    <AccountPageWrapper>
      <PageStructure title="Check your email" width="narrow">
        <PageIntro
          textList={[
            "Please check your email for a link to sign-in",
            "You've got 24 hours to use the link - make sure you check that spam folder!",
          ]}
          hrProps={{ position: "left" }}
        />
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href={EURLS.SignIn} variant="secondary">
            Sign in options
          </Link>
        </div>
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default SignInMagicLink;
