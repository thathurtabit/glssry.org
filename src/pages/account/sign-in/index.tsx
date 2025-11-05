import { useEffect, useState } from "react";

import { type InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getProviders, signIn } from "next-auth/react";
import { ReCaptcha, ReCaptchaProvider } from "next-recaptcha-v3";

import { AlreadySignedIn } from "~/components/atoms/already-signed-in/already-signed-in";
import { Button } from "~/components/atoms/button/button";
import { ErrorMessage } from "~/components/atoms/error-message/error-message";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { IconDiscord } from "~/components/icons/discord/discord";
import { IconEmail } from "~/components/icons/email/email";

import { IconFacebook } from "~/components/icons/facebook/facebook";
import { IconGithub } from "~/components/icons/github/github";
import { IconGoogle } from "~/components/icons/google/google";
import { IconReddit } from "~/components/icons/reddit/reddit";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { environment } from "~/environment.mjs";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { useVerifyRecaptchaMutation } from "~/hooks/auth/recaptcha-verify.hook";
import { EURLS } from "~/settings/constants";
import { ESignInMessage } from "~/types/sign-in.types";
import { getSignInErrorMessage } from "~/utils/sign-in.utilities";

const handleSignIn = (id: string) => {
  (async () => {
    await signIn(id, { callbackUrl: EURLS.SignInSuccess });
  })().catch((error: Error) => {
    throw new Error(error.message);
  });
};

export const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isHuman, setIsHuman] = useState(false);
  const [token, setToken] = useState<string>("");
  const { mutateVerifyRecaptchaAsync, mutateVerifyRecaptchaLoading } =
    useVerifyRecaptchaMutation();
  const [recaptchaError, setRecaptchaError] = useState("");
  const { query } = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const action = "LOGIN";

  useEffect(() => {
    if (token) {
      (async () => {
        const { success, reasons } = await mutateVerifyRecaptchaAsync({
          token,
        });

        if (success) {
          setIsHuman(true);
          return;
        }

        setRecaptchaError(reasons ?? "Unknown error");
      })().catch(() => {
        setRecaptchaError("Unknown error");
      });
    }
  }, [token, action, mutateVerifyRecaptchaAsync]);

  if (!providers) {
    return (
      <PageStructure title="Sign in">
        <p>There are currently no providers to sign up/in with.</p>
      </PageStructure>
    );
  }

  const providersList = Object.values(providers);

  const { error } = query;

  const errorExists = error !== undefined && error !== null;
  const errorIsArray = Array.isArray(error);
  const firstErrorFromArray =
    (error?.at(0) as ESignInMessage) ?? ESignInMessage.Default;

  const errorFiltered: ESignInMessage = errorExists
    ? errorIsArray
      ? firstErrorFromArray
      : ((error as ESignInMessage) ?? ESignInMessage.Default)
    : ESignInMessage.Default;

  const errorMessage = errorFiltered
    ? getSignInErrorMessage(errorFiltered satisfies ESignInMessage)
    : null;

  const recaptchaIsLoading = mutateVerifyRecaptchaLoading && !recaptchaError;

  const showError = typeof errorMessage === "string" && errorExists;

  const getProviderIconByID = (id: string) => {
    switch (id) {
      case "email": {
        return <IconEmail size="1.25rem" />;
      }

      case "github": {
        return <IconGithub size="1.25rem" />;
      }

      case "google": {
        return <IconGoogle size="1.15rem" />;
      }

      case "reddit": {
        return <IconReddit size="1.15rem" />;
      }

      case "facebook": {
        return <IconFacebook size="1.15rem" />;
      }

      case "discord": {
        return <IconDiscord size="1.15rem" />;
      }

      default: {
        break;
      }
    }
  };

  if (isAuthenticated) {
    return <AlreadySignedIn />;
  }

  if (!isHuman) {
    return (
      <ReCaptchaProvider
        useEnterprise
        reCaptchaKey={environment.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
      >
        <AccountPageWrapper skipAuthCheck>
          <SharedHead title="Bot Check" />
          <PageStructure title="Bot check" width="narrow">
            <PageIntro
              textList={[
                "Verifying that you're human...",
                "Bots on ships can cause mischief, much like Ash did on the Nostromo",
              ]}
            />

            {recaptchaError ? (
              <InfoPanel title="reCaptcha failed" type="error">
                Failed with: &ldquo;{recaptchaError}&rdquo;
              </InfoPanel>
            ) : null}
            {recaptchaIsLoading ? (
              <div>
                <InfoPanel title="Hold tight..." type="pending">
                  Currently loading the <strong>are you human</strong> check...
                </InfoPanel>
              </div>
            ) : (
              <ReCaptcha action={action} onValidate={setToken} />
            )}
          </PageStructure>
        </AccountPageWrapper>
      </ReCaptchaProvider>
    );
  }

  return (
    <AccountPageWrapper skipAuthCheck>
      <SharedHead title="Sign In" />
      <PageStructure title="Sign in">
        <PageIntro
          textList={[
            "Pick your sign in method",
            <span key="remember-your-sign-in-method">
              Try to <strong>remember how you signed in</strong> for next time!
            </span>,
          ]}
        />
        {showError && <ErrorMessage title="Uh oh" text={errorMessage} />}
        {providersList && (
          <ul className="my-3">
            {providersList.map(({ name, id }) => (
              <li key={name} className="m-2">
                <Button
                  size="small"
                  variant="primary"
                  className="min-w-fit"
                  onClick={() => handleSignIn(id)}
                >
                  <span className="mr-1">{getProviderIconByID(id)}</span>Sign in
                  with {name}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default SignIn;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return { props: { providers } };
};
