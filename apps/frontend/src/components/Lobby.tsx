import { useDispatch, useSelector } from "react-redux";
import {
  clearAll,
  setLoading,
  setLastRound,
  setConnectionError,
  toggleBetPosition,
} from "./../state/features/betSlice";
import type { RootState } from "./../state/store";
import { sendBet } from "./../actions/ws";
import Round from "./../components/Round";
import Footer from "./Footer";
import Header from "./Header";
import { BET_VALUE } from "../const";

export default function Lobby() {
  const dispatch = useDispatch();
  const { wallet, betPositions, loading, lastRound, totalWon } = useSelector(
    (state: RootState) => state.bets
  );

  const handlePlay = async () => {
    if (betPositions.length === 0) return;

    dispatch(setLoading(true));

    try {
      const response = await sendBet(betPositions);
      if (response) {
        // todo fix type
        dispatch(setLastRound(response));
      }
    } catch (err) {
      dispatch(setConnectionError("There was an error placing your bet"));
      console.error(err);
    } 
  };

  const bet = betPositions.length * BET_VALUE;


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black-400 to-black-900 text-white">
      <Header wallet={wallet} bet={bet} win={lastRound?.payout || 0} />
      <main
        className="flex-1 flex items-center justify-center pt-12 pb-20"
        style={{ paddingBottom: 220 }}
      >
        <Round lastRound={lastRound} totalWon={totalWon} />
      </main>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <Footer
          betPositions={betPositions}
          loading={loading}
          lastRound={lastRound}
          onChoice={(move) => dispatch(toggleBetPosition(move))}
          onClear={() => dispatch(clearAll())}
          onPlay={handlePlay}
        />
      </div>
    </div>
  );
}
