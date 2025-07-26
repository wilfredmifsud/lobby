import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "../../components/model";


const initialState: GameState = {
  autoplay: false,
  autoplayChecked: false,
  shuffle: false,
  connectionError: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setAutoplay: (state, action: PayloadAction<boolean>) => {
      state.autoplay = action.payload;
    },
    setAutoplayChecked: (state, action: PayloadAction<boolean>) => {
      state.autoplayChecked = action.payload;
    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      state.shuffle = action.payload;
    },
    setConnectionError: (state, action: PayloadAction<string | null>) => {
      state.connectionError = action.payload;
    },
  },
});

export const {
  setAutoplay,
  setAutoplayChecked,
  setShuffle,
  setConnectionError,
} = gameSlice.actions;

export default gameSlice.reducer;
