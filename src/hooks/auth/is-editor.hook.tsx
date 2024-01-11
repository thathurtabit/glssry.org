import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

/** Is Editor or above (i.e Admin) */
export const useIsEditor = (): boolean => {
  const { data: sessionData, status } = useSession();
  const isAuthenticatedAsEditor =
    status === "authenticated" &&
    sessionData !== null &&
    (sessionData.user?.role === UserRole.EDITOR ||
      sessionData.user?.role === UserRole.ADMIN);
  return isAuthenticatedAsEditor;
};
