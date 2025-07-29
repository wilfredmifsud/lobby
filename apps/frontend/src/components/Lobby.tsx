import { useDispatch, useSelector } from "react-redux";
import {
  toggleChoice,
  clearAll,
  setLoading,
  setLastRound,
  setConnectionError,
} from "./../state/features/betSlice";
import type { RootState } from "./../state/store";
import { sendBet } from "./../actions/ws";
import Round from "./../components/Round";
import Footer from "./Footer";
import Header from "./Header";
import { BET_VALUE } from "../const";

export default function Lobby() {
  const dispatch = useDispatch();
  const { wallet, choices, loading, lastRound, totalWon } = useSelector(
    (state: RootState) => state.bets
  );

  const handlePlay = async () => {
    if (choices.length === 0) return;

    dispatch(setLoading(true));
    const betsPayload = choices.map((move) => ({ move }));

    try {
      const response = await sendBet(betsPayload);
      if (response) {
        // todo fix type
        dispatch(setLastRound(response));
      }
    } catch (err) {
      dispatch(setConnectionError("There was an error placing your bet"));
      console.error(err);
    } 
  };

  const bet = choices.length * BET_VALUE;
  const win = lastRound
    ? lastRound.bets.reduce((sum, b) => sum + (b.returned || 0), 0)
    : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Header wallet={wallet} bet={bet} win={win} />
      <main
        className="flex-1 flex items-center justify-center pt-12 pb-20"
        style={{ paddingBottom: 220 }}
      >
        <Round lastRound={lastRound} totalWon={totalWon} />
      </main>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <Footer
          choices={choices}
          loading={loading}
          lastRound={lastRound}
          onChoice={(move) => dispatch(toggleChoice(move))}
          onClear={() => dispatch(clearAll())}
          onPlay={handlePlay}
        />
      </div>
    </div>
  );
}
