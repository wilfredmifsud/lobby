import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChoices, setBets, setLoading } from "./../state/features/betSlice";
import type { RootState } from "./../state/store";
import { sendBet } from "./../actions/ws";
import Round from "./../components/Round";
import Footer from "./Footer";
import Header from "./Header";

export default function Lobby() {
  const dispatch = useDispatch();
  const { wallet, choices, bets, loading, lastRound, totalWon } = useSelector((state: RootState) => state.bets);


  // take it out of component to make it easier?
  const handleChoice = (move: string) => {
    let newChoices = choices;
    let newBets = bets;
    if (choices.includes(move)) {
      newChoices = choices.filter((m) => m !== move);
      newBets = bets.filter((bet) => bet.move !== move);
    } else if (choices.length < 2) {
      newChoices = [...choices, move];
      // Add a default bet for the new move if not present
      if (!bets.some((bet) => bet.move === move)) {
        newBets = [...bets, { move, amount: 500 }];
      }
    }
    dispatch(setChoices(newChoices));
    dispatch(setBets(newBets));
  };

  const handleClear = () => {
    dispatch(setChoices([]));
    dispatch(setBets([]));
  };

  const handlePlay = () => {

    if (choices.length === 0) return;
    dispatch(setLoading(true));
    // Send only the moves, backend will use 500 for each
    const betsPayload = choices.map((move) => ({ move }));
    sendBet(betsPayload);
  };

  const bet = choices.length * 500;
  const win = lastRound ? lastRound.bets.reduce((sum, b) => sum + b.returned, 0) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Header wallet={wallet} bet={bet} win={win} />
      <main className="flex-1 flex items-center justify-center pt-12 pb-20" style={{ paddingBottom: 220 }}>
        <Round lastRound={lastRound} totalWon={totalWon} />
      </main>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <Footer
          choices={choices}
          loading={loading}
          handleChoice={handleChoice}
          handleClear={handleClear}
          handlePlay={handlePlay}
        />
      </div>
    </div>
  );
}
