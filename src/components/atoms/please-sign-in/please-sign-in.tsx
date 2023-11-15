import type { FC } from "react";
import type { IPleaseSignIn } from "./please-sign-in.types";
import { useSession } from "next-auth/react";
import { SignInOrOutButton } from "../sign-in-button/sign-in-button";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { InfoPanel } from "../info-panel/info-panel";

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
