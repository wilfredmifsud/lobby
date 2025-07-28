import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChoice, setLoading } from "./../state/features/betSlice";
import type { RootState } from "./../state/store";
import { sendBet } from "./../actions/ws";
import Round from "./../components/Round";
import LobbyFooter from "./LobbyFooter";
import Header from "./Header";

export default function Lobby() {
  const dispatch = useDispatch();

  const { wallet, betAmount, choice, loading, lastRound } = useSelector(
    (state: RootState) => state.bets,
  );

  const handleChoice = useCallback(
    (move: string) => {
      if (betAmount > 0 && betAmount <= wallet) {
        dispatch(setChoice(move));
      }
    },
    [betAmount, wallet],
  );

  const handlePlay = () => {
    if (!choice || betAmount < 1 || betAmount > wallet) return;

    dispatch(setLoading(true));
    sendBet(choice, betAmount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Header wallet={wallet} />

      <main className="flex-1 flex items-center justify-center pt-12 pb-20">
        <Round lastRound={lastRound} />
      </main>

      <div className="fixed bottom-0 left-0 w-full">
        <LobbyFooter
          wallet={wallet}
          choice={choice}
          loading={loading}
          betAmount={betAmount}
          handleChoice={handleChoice}
          handlePlay={handlePlay}
        />
      </div>
    </div>
  );
}
