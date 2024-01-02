import type { FC } from "react";

import { useSession } from "next-auth/react";

import type { IPleaseSignIn } from "./please-sign-in.types";
import { InfoPanel } from "../info-panel/info-panel";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { SignInOrOutButton } from "../sign-in-button/sign-in-button";

export const PleaseSignIn: FC<IPleaseSignIn> = ({
  message = "You'll need to sign in to view this page",
}) => {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated") {
    return (
      <InfoPanel title="Please sign in">
        <p className="mb-4">{message}</p>
        <SignInOrOutButton />
      </InfoPanel>
    );
  }

  return null;
};
