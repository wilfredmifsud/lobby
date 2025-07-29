import { useDispatch, useSelector } from "react-redux";
import {
  clearAll,
  setLoading,
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
      await sendBet(betPositions);      
    } catch (err) {
      dispatch(setConnectionError("There was an error placing your bet"));
      console.error(err);
    } 
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #464646 0%, #1c1c1c 100%)",
      }}
    >
      <Header 
      wallet={wallet}
       bet={betPositions.length * BET_VALUE} 
       win={lastRound?.payout || 0} />
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
