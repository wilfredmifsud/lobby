import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Bet = {
  user: string;
  amount: number;
  bet: string;
  dealerMove: string;
  result: "win" | "lose" | "draw";
  wallet: number;
  round: number;
};

export interface LastRound {
  playerMove: string;
  dealerMove: string;
  result: "win" | "lose" | "draw";
}

interface BetsState {
  wallet: number;
  betAmount: number;
  choice: string | null;
  loading: boolean;
  lastRound: LastRound | null;
  history: Bet[];
}

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
