import { api } from "~/utils/api";
import { useContext, useEffect } from "react";
import {
  GlssryDispatchContext,
  GlssryStateContext,
} from "~/context/context/context";
import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { useIsAuthenticated } from "../auth/is-authenticated.hook";

/** Read User Data from TRPC */
export const useReadUser = () => {
  const state = useContext(GlssryStateContext);
  const dispatch = useContext(GlssryDispatchContext);
  const isAuthenticated = useIsAuthenticated();
  const { data: userData, isError } = api.account.readUser.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const errorNotificationUUID = "error-fetching-user-data";
  const doesErrorNotificationAlreadyExist =
    state.notifications?.notifications?.some(
      ({ uuid }) => uuid === errorNotificationUUID
    );

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (isError && !doesErrorNotificationAlreadyExist) {
      dispatch(
        setNewNotification({
          uuid: errorNotificationUUID,
          type: "error",
          title: "Oh no!",
          message: "Error occurred fetching User data",
        })
      );
    }
  }, [isError, doesErrorNotificationAlreadyExist, isAuthenticated, dispatch]);

  const { id, email, emailVerified, hasPersonalizedUsername, image, username } =
    userData ?? {};

  const hasUserData = Boolean(userData?.email);

  return {
    hasUserData,
    isError,
    email,
    emailVerified,
    hasPersonalizedUsername: Boolean(hasPersonalizedUsername),
    id,
    image,
    username,
  };
};
