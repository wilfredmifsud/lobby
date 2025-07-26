import { store } from "../state/store";
import { WSMessage } from "./model";
import {
  setWallet,
  setLastRound,
  addBet,
  setLoading,
} from "../state/features/betSlice";
import { getResultText } from "./const";

export const handleInit = (data: Extract<WSMessage, { type: "INIT" }>) => {
  store.dispatch(setWallet(data.wallet));
};

export const handleBetResult = (
  data: Extract<WSMessage, { type: "BET_RESULT" }>,
) => {
  const result = getResultText(data.win, data.playerMove, data.dealerMove);
  store.dispatch(
    setLastRound({
      playerMove: data.playerMove,
      dealerMove: data.dealerMove,
      result,
    }),
  );
  store.dispatch(setWallet(data.wallet));
  store.dispatch(setLoading(false));
  store.dispatch(
    addBet({
      user: "You",
      amount: data.amount,
      bet: data.playerMove,
      dealerMove: data.dealerMove,
      wallet: data.wallet,
      result,
      round: data.round,
    }),
  );
};

export const handleNoCredits = () => {
  // todo should be proper handling when no credits
  store.dispatch(setLoading(false));
};

export const handleError = () => {
  store.dispatch(setLoading(false));
};
