import { useEffect, useState } from "react";

import { useGenerateAndSetRandomUsername } from "./generate-and-set-random-username.hook";
import { useReadUser } from "./read-user.hook";
import { useIsAuthenticated } from "../auth/is-authenticated.hook";

/** Generate random username and mutate it if one doesn't already exist */
export const useGenerateAndSetRandomUsernameOnLoad = () => {
  const [
    shouldCreateAndSetRandomUsername,
    setShouldCreateAndSetRandomUsername,
  ] = useState(false);
  const [usernameGeneratedAndSaved, setUsernameGeneratedAndSaved] =
    useState(false);
  const isAuthenticated = useIsAuthenticated();
  const { username, isLoading } = useReadUser();
  const { randomUsername, setUsername } = useGenerateAndSetRandomUsername({
    generateRandomUsername: shouldCreateAndSetRandomUsername,
    onSuccess: () => setUsernameGeneratedAndSaved(true),
  });

  useEffect(() => {
    if (
      !isAuthenticated ||
      isLoading ||
      Boolean(username) ||
      usernameGeneratedAndSaved
    ) {
      return;
    }

    setShouldCreateAndSetRandomUsername(true);
    if (randomUsername && !username) {
      setUsername({ username: randomUsername });
    }
  }, [
    isAuthenticated,
    username,
    randomUsername,
    usernameGeneratedAndSaved,
    isLoading,
  ]);

  return {
    shouldCreateAndSetRandomUsername,
    usernameGeneratedAndSaved,
  };
};
