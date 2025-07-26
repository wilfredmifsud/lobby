import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "./features/betSlice";
import gameReducer from "./features/gameSlice";

export const store = configureStore({
  reducer: {
    bets: betsReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
