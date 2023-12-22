import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  GlssryStateContext,
  GlssryDispatchContext,
} from "../../context/context/context";
import { setMenuOpen } from "../../context/actions/page/page.actions";

interface IUseRouterEvent {
  callback?: () => void;
}

export const useRouterEvent = ({ callback }: IUseRouterEvent) => {
  const { page } = useContext(GlssryStateContext);
  const dispatch = useContext(GlssryDispatchContext);
  const { events } = useRouter();
  const { isMenuOpen } = page;

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (isMenuOpen) {
        dispatch(setMenuOpen(false));
      }

      callback?.();
    };

    events.on("routeChangeStart", handleRouteChangeStart);
  }, [events, isMenuOpen, callback, dispatch]);
};
