import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

export const useIsAdmin = (): boolean => {
  const { data: sessionData, status } = useSession();
  const isAuthenticated = status === "authenticated" && sessionData !== null && sessionData.user?.role === Role.ADMIN;
  return isAuthenticated;
};
