import { UserRole } from "~/generated/prisma/enums";
import { useSession } from "next-auth/react";

export const useIsAdmin = (): boolean => {
  const { data: sessionData, status } = useSession();
  const isAuthenticatedAsAdmin =
    status === "authenticated" &&
    sessionData !== null &&
    sessionData.user?.role === UserRole.ADMIN;
  return isAuthenticatedAsAdmin;
};
