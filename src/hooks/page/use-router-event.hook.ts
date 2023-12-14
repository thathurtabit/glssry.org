import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  GlssryStateContext,
  GlssryDispatchContext,
} from "../../context/context/context";
import { setMenuOpen } from "../../context/actions/page/page.actions";

export const useRouterEvent = () => {
  const { page } = useContext(GlssryStateContext);
  const dispatch = useContext(GlssryDispatchContext);
  const { events } = useRouter();
  const { isMenuOpen } = page;

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (isMenuOpen) {
        dispatch(setMenuOpen(false));
      }
    };

    events.on("routeChangeStart", handleRouteChangeStart);
  }, [events, isMenuOpen, dispatch]);
};
