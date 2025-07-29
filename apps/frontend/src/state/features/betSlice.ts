import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BetsState, LastRound } from "../../components/model";

const initialState: BetsState = {
  wallet: 0,
  betPositions: [],
  loading: false,
  lastRound: null,
  connectionError: null,
};

export const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<number>) => {
      state.wallet = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLastRound: (state, action: PayloadAction<LastRound | null>) => {
      state.lastRound = action.payload;
    },
    setConnectionError: (state, action: PayloadAction<string | null>) => {
      state.connectionError = action.payload;
    },
    toggleBetPosition: (state, action: PayloadAction<string>) => {
      const move = action.payload;
      if (state.betPositions.some((position) => position === move)) {
        state.betPositions = state.betPositions.filter(
          (position) => position !== move,
        );
      } else if (state.betPositions.length < 2) {
        state.betPositions.push(move);
      }
    },
    clearAll: (state) => {
      state.betPositions = [];
      state.lastRound = null;
    },
  },
});

export const {
  setWallet,
  setLoading,
  setLastRound,
  setConnectionError,
  toggleBetPosition,
  clearAll,
} = betsSlice.actions;

export default betsSlice.reducer;
