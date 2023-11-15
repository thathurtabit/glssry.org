import { useSession } from "next-auth/react";

export const useIsAuthenticated = (): boolean => {
  const { data: sessionData, status } = useSession();

  const isAuthenticated = status === "authenticated" && sessionData !== null;
  return isAuthenticated;
};
