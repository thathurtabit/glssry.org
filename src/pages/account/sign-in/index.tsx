import { ESignInMessage } from "~/types/sign-in.types";
import { ReCaptcha, ReCaptchaProvider } from "next-recaptcha-v3";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { ErrorMessage } from "~/components/atoms/error-message/error-message";
import { appURL } from "~/settings/constants";
import { getSignInErrorMessage } from "~/utils/sign-in.utils";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { Button } from "~/components/atoms/button/button";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { AlreadySignedIn } from "~/components/atoms/already-signed-in/already-signed-in";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import { IconGoogle } from "~/components/icons/google/google";
import { IconGithub } from "~/components/icons/github/github";
import { IconEmail } from "~/components/icons/email/email";
import { IconDiscord } from "~/components/icons/discord/discord";
import { type InferGetServerSidePropsType } from "next";
import { useVerifyRecaptchaMutation } from "~/hooks/auth/recaptcha-verify.hook";
import { env } from "~/env.mjs";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";

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
      : (error as ESignInMessage) ?? ESignInMessage.Default
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

  const handleSignIn = (id: string) => {
    (async () => {
      await signIn(id, { callbackUrl: appURL });
    })().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error); // TODO: Add error logging
    });
  };

  if (!isHuman) {
    return (
      <ReCaptchaProvider
        useEnterprise
        reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
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
                  size="medium"
                  variant="primary"
                  className="min-w-fit"
                  onClick={() => handleSignIn(id)}
                >
                  <span>{getProviderIconByID(id)}</span>Sign in with {name}
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
