import { store } from "../state/store";
import { WSMessage } from "./model";
import {
  setWallet,
  setLastRound,
  setLoading,
} from "../state/features/betSlice";

export const handleInit = (data: Extract<WSMessage, { type: "INIT" }>) => {
  store.dispatch(setWallet(data.wallet));
};

export const handleBetResult = (
  data: Extract<WSMessage, { type: "BET_RESULT" }>,
) => {
  store.dispatch(
    setLastRound({
      dealerMove: data.dealerMove,
      payout: data.payout,
      bets: data.bets,
    }),
  );
  store.dispatch(setWallet(data.wallet));
};

export const handleNoCredits = () => {
  // todo should be proper handling when no credits
  store.dispatch(setLoading(false));
};

export const handleError = () => {
  store.dispatch(setLoading(false));
};
