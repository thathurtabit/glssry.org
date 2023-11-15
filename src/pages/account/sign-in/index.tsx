import type { FormEvent } from "react";
import { ESignInMessage } from "~/types/sign-in.types";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState, useRef } from "react";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import { useRouter } from "next/router";
import { ErrorMessage } from "~/components/atoms/error-message/error-message";
import { appURL, EURLS } from "~/settings/constants";
import { getSignInErrorMessage } from "~/utils/sign-in.utils";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { Button } from "~/components/atoms/button/button";
import { FormInput } from "~/components/atoms/form-input/form-input";
import { emailSchema } from "~/schemas/account/email.schema";
import { HorizontalRule } from "~/components/atoms/hr/hr";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { AccountPageWrapper } from "~/components/organisms/account-page-wrapper/account-page-wrapper";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { AlreadySignedIn } from "~/components/atoms/already-signed-in/already-signed-in";
import { useVerifyHCaptchaMutation } from "~/hooks/auth/h-captcha-verify.hook";
import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import { env } from "~/env.mjs";
import { IconGoogle } from "~/components/icons/google/google";
import { IconGithub } from "~/components/icons/github/github";
import { IconEmail } from "~/components/icons/email/email";
import { IconDiscord } from "~/components/icons/discord/discord";
import { type BuiltInProviderType } from "next-auth/providers";
import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from "next";

type Providers = Record<
  LiteralUnion<BuiltInProviderType>,
  ClientSafeProvider
> | null;

const hCaptchaSiteKey = env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;

export const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isHCaptchaLoading, setIsHCaptchaLoading] = useState(true);
  const [isHuman, setIsHuman] = useState(false);
  const captchaReference = useRef<HCaptcha>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useRouter();
  const isAuthenticated = useIsAuthenticated();

  const {
    mutateVerifyHCaptchaAsync,
    mutateVerifyHCaptchaError,
    mutateVerifyHCaptchaLoading,
  } = useVerifyHCaptchaMutation();

  if (!providers) {
    return (
      <PageStructure title="Join In">
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

  const showError = typeof errorMessage === "string" && errorExists;

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setEmailError("Please enter your email address");
      return;
    }

    const emailSchemaValidation = emailSchema.safeParse({ email });
    if (!emailSchemaValidation.success) {
      const errorMessage = emailSchemaValidation.error.issues.at(0)?.message;
      if (errorMessage) {
        setEmailError(errorMessage);
      }

      setIsLoading(false);
      return;
    }

    (async () => {
      // SEND TO /api/auth/signin
      setIsLoading(true);
      await signIn("email", {
        email,
        callbackUrl: EURLS.SignInSuccess,
      });
    })().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error); // TODO: Add error logging
      setIsLoading(false);
    });
  };

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

  const handleHCaptchaVerification = async (token: string) => {
    const { statusCode, message } = await mutateVerifyHCaptchaAsync({ token });
    const isVerified = statusCode === 200;
    setIsHuman(isVerified);
    setIsHCaptchaLoading(false);
    if (!isVerified) {
      // eslint-disable-next-line no-console
      console.error(message); // TODO: Add error logging
    }
  };

  const onHCaptchaLoad = () => {
    if (errorMessage) {
      return;
    }

    setIsHCaptchaLoading(false);
  };

  const HCaptchaInfo = () => {
    if (mutateVerifyHCaptchaError === null) {
      return null;
    }

    if (mutateVerifyHCaptchaLoading) {
      return null;
    }

    return (
      <InfoPanel title="Not human?">
        Seems there was a problem trying to verify you as not being a bot...
      </InfoPanel>
    );
  };

  if (!isHuman) {
    return (
      <AccountPageWrapper>
        <PageStructure title="Join In" width="narrow">
          <PageIntro
            textList={[
              "Please verify that you're human",
              "Bots on ships can cause mischief, much like Ash did on the Nostromo",
            ]}
          />
          {isHCaptchaLoading && errorMessage === null && (
            <InfoPanel title="Hold tight..." type="pending">
              Currently loading the <strong>are you human</strong> check...
            </InfoPanel>
          )}
          {hCaptchaSiteKey ? (
            <form>
              {mutateVerifyHCaptchaLoading && (
                <LoadingSpinner className="mb-4" />
              )}
              <HCaptchaInfo />
              <HCaptcha
                ref={captchaReference}
                id="hcaptcha-input"
                sitekey={hCaptchaSiteKey}
                onLoad={onHCaptchaLoad}
                onVerify={(token) => handleHCaptchaVerification(token)}
              />
            </form>
          ) : (
            <InfoPanel title="Uh oh" type="error">
              No hCaptcha sitekey provided
            </InfoPanel>
          )}
        </PageStructure>
      </AccountPageWrapper>
    );
  }

  return (
    <AccountPageWrapper>
      <PageStructure title="Sign In">
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
            {providersList.map(({ name, id, type }) => {
              if (type === "email") {
                return (
                  <li key={`sign-in-${id}`} className="mb-4 pb-4">
                    <form className="mb-5 pb-5" onSubmit={handleEmailSubmit}>
                      <FormInput
                        id="sign-in-with-email"
                        label="Sign in with email"
                        description="We'll email you a magic link to sign in with"
                        type="email"
                        value={email}
                        placeholder="your@nice-email.com"
                        hasError={Boolean(emailError)}
                        errorText={emailError}
                        submitButtonData={{
                          children: "Submit",
                          loading: isLoading,
                        }}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </form>
                    <HorizontalRule position="left" />
                    <p className="text-sm">
                      Or if you think email is for suckers...
                    </p>
                  </li>
                );
              }

              return (
                <li key={name} className="m-2">
                  <Button
                    size="large"
                    variant="tertiary"
                    className="min-w-fit"
                    onClick={() => handleSignIn(id)}
                  >
                    <span>{getProviderIconByID(id)}</span>Sign in with {name}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default SignIn;

export const getServerSideProps = (async () => {
  const providers: Providers = await getProviders();
  return { props: { providers } };
}) satisfies GetServerSideProps<{
  providers: Providers;
}>;
