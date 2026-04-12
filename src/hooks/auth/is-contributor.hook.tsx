import { UserRole } from "~/generated/prisma/enums";
import { useSession } from "next-auth/react";

export const useIsContributor = (): boolean => {
  const { data: sessionData, status } = useSession();
  const isAuthenticatedAsContributor =
    status === "authenticated" &&
    sessionData !== null &&
    sessionData.user?.role === UserRole.EDITOR;
  return isAuthenticatedAsContributor;
};
