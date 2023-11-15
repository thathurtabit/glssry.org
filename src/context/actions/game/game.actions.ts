import type { TGameNavigationTypes } from "~/types/core.types";
import type { IContextAction } from "../../types/context.types";
import { GameActions } from "./game.actions.types";

export const setGameView = (payload: TGameNavigationTypes): IContextAction => ({
  type: GameActions.SET_ACTIVE_GAME_VIEW,
  payload,
});

export const resetGameState = (): IContextAction => ({
  type: GameActions.RESET_GAME_STATE,
});

