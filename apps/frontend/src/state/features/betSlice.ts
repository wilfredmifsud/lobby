import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet, BetsState, LastRound } from "../../components/model";

const initialState: BetsState = {
  wallet: 0,
  betAmount: 5,
  choice: null,
  loading: false,
  lastRound: null,
  history: [],
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
    addBet: (state, action: PayloadAction<Bet>) => {
      state.history.unshift(action.payload);
      state.history = state.history.slice(0, 10);
    },
    clearBets: (state) => {
      state.history = [];
    },
  },
});

export const {
  setWallet,
  setBetAmount,
  setChoice,
  setLoading,
  setLastRound,
  addBet,
  clearBets,
} = betsSlice.actions;

export default betsSlice.reducer;
