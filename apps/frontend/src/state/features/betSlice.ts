import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BetsState, LastRound } from "../../components/model";

const initialState: BetsState = {
  wallet: 0,
  choices: [],
  bets: [],
  loading: false,
  lastRound: null,
  connectionError: null,
  totalWon: 0,
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
      state.totalWon = action.payload
        ? action.payload.bets.reduce((total, bet) => total + (bet.returned || 0), 0)
        : 0;
    },
    setConnectionError: (state, action: PayloadAction<string | null>) => {
      state.connectionError = action.payload;
    },
    toggleChoice: (state, action: PayloadAction<string>) => {
      const move = action.payload;
      if (state.choices.includes(move)) {
        state.choices = state.choices.filter((m) => m !== move);
        state.bets = state.bets.filter((bet) => bet.move !== move);
      } else if (state.choices.length < 2) {
        state.choices.push(move);
        if (!state.bets.some((bet) => bet.move === move)) {
          state.bets.push({ move });
        }
      }
    },
    clearAll: (state) => {
      state.choices = [];
      state.lastRound = null;
      state.bets = [];
    },
  },
});

export const {
  setWallet,
  setLoading,
  setLastRound,
  setConnectionError,
  toggleChoice,
  clearAll,
} = betsSlice.actions;

export default betsSlice.reducer;
