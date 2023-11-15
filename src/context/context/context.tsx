import type {
  ContextReducer,
  TGlssryStateContext,
  TGlssryDispatchContext,
} from "../types/context.types";
import type { IAppProvider } from "~/context/context/context.types";
import type { ReactNode } from "react";
import React, { createContext, useMemo, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import { initState } from "~/context/state/init-state";
import { pageReducer } from "~/context/reducers/page/page.reducer";
import { notificationsReducer } from "~/context/reducers/notifications/notifications.reducer";
export const GlssryStateContext = createContext<TGlssryStateContext>(initState);

export const GlssryDispatchContext = createContext<TGlssryDispatchContext>(
  () => null
);

GlssryStateContext.displayName = "GlssryStateContext";
GlssryDispatchContext.displayName = "GlssryDispatchContext";

export const GlssryAppProvider = ({ children }: IAppProvider): ReactNode => {
  const [combinedReducer, combinedInitState] = combineReducers<ContextReducer>({
    page: [pageReducer, initState.page],
    notifications: [notificationsReducer, initState.notifications],
  });

  const [state, dispatch] = useReducer<ContextReducer>(
    combinedReducer,
    combinedInitState
  );

  const memoizedStateContextValue: TGlssryStateContext =
    useMemo<TGlssryStateContext>(() => state, [state]);

  const memoizedDispatchContextValue: TGlssryDispatchContext =
    useMemo<TGlssryDispatchContext>(() => dispatch, [dispatch]);

  return (
    <GlssryDispatchContext.Provider value={memoizedDispatchContextValue}>
      <GlssryStateContext.Provider value={memoizedStateContextValue}>
        {children}
      </GlssryStateContext.Provider>
    </GlssryDispatchContext.Provider>
  );
};
