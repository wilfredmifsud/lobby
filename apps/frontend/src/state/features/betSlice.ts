import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BetsState, LastRound } from "../../components/model";

const initialState: BetsState = {
  wallet: 0,
  betAmount: 500,
  choices: [],
  bets: [],
  loading: false,
  lastRound: null,
  connectionError: null,
  totalWon: 0, // NEW
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
    setChoices: (state, action: PayloadAction<string[]>) => {
      state.choices = action.payload;
    },
    setBets: (state, action: PayloadAction<{ move: string; amount: number }[]>) => {
      state.bets = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLastRound: (state, action: PayloadAction<LastRound | null>) => {
      state.lastRound = action.payload;
      if (action.payload) {
        state.totalWon = action.payload.bets.reduce((total, bet) => total + (bet.returned || 0), 0);
      } else {
        state.totalWon = 0;
      }
    },
    setConnectionError: (state, action: PayloadAction<string | null>) => {
      state.connectionError = action.payload;
    },
  },
});

export const {
  setWallet,
  setBetAmount,
  setChoices,
  setBets,
  setLoading,
  setLastRound,
  setConnectionError,
} = betsSlice.actions;

export default betsSlice.reducer;
