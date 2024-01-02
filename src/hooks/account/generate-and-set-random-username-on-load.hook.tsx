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
  const { username } = useReadUser();
  const { randomUsername, setUsername } = useGenerateAndSetRandomUsername({
    generateRandomUsername: shouldCreateAndSetRandomUsername,
    onSuccess: () => setUsernameGeneratedAndSaved(true),
  });

  useEffect(() => {
    if (!isAuthenticated || Boolean(username) || usernameGeneratedAndSaved) {
      return;
    }

    setShouldCreateAndSetRandomUsername(true);
    if (randomUsername && !username) {
      setUsername({ username: randomUsername });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we want to avoid mutation loop of doom
  }, [isAuthenticated, username, randomUsername, usernameGeneratedAndSaved]);

  return {
    shouldCreateAndSetRandomUsername,
    usernameGeneratedAndSaved,
  };
};
