import type { FC } from "react";
import type { IAlreadySignedIn } from "./already-signed-in.types";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { Link } from "../link/link";

export const AlreadySignedIn: FC<IAlreadySignedIn> = ({
  message = "Hey, you're already signed in and good to go!",
}) => {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "authenticated") {
    return (
      <PageStructure title="You're signed in">
        <p className="mb-4">{message}</p>
        <Link href="/">Home</Link>
      </PageStructure>
    );
  }
};
