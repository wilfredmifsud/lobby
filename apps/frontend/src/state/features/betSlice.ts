import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet, BetsState, LastRound } from "../../components/model";

const initialState: BetsState = {
  wallet: 0,
  betAmount: 5,
  choice: null,
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
    setBetAmount: (state, action: PayloadAction<number>) => {
      state.betAmount = action.payload;
    },
    setChoice: (state, action: PayloadAction<string | null>) => {
      state.choice = action.payload;
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
  },
});

export const {
  setWallet,
  setBetAmount,
  setChoice,
  setLoading,
  setLastRound,
  setConnectionError,
} = betsSlice.actions;

export default betsSlice.reducer;
