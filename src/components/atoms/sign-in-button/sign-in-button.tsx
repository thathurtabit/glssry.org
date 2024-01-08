import type { FC } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import { IconAccount } from "~/components/icons/account/account";
import { IconExit } from "~/components/icons/exit/exit";
import { EURLS } from "~/settings/constants";

import type { ISignInOrOutButton } from "./sign-in-button.types";

import { Button } from "../button/button";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

export const SignInOrOutButton: FC<ISignInOrOutButton> = ({
  allowSignOut = false,
}) => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const shouldShowSignOut: boolean = allowSignOut && isAuthenticated;

  const handleSignInOrOut = () => {
    if (shouldShowSignOut) {
      (async () => {
        await signOut({ callbackUrl: EURLS.SignedOut });
      })().catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }

    (async () => {
      await signIn("sign-in-button", { callbackUrl: EURLS.SignInSuccess });
    })().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Button
      size="small"
      className="inline-block mt-auto"
      onClick={handleSignInOrOut}
    >
      {shouldShowSignOut ? "Sign out" : "Sign in"}
      {shouldShowSignOut ? <IconExit /> : <IconAccount />}
    </Button>
  );
};
