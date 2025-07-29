import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IBetsProps } from "./model";
import { useDispatch } from "react-redux";
import { setLoading } from "../state/features/betSlice";

const Round = ({ lastRound, totalWon }: IBetsProps) => {
  const dispatch = useDispatch();
  const [showResult, setShowResult] = useState(false);
  const vsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Reset showResult whenever a new round starts
  useEffect(() => {
    if (lastRound) {
      setShowResult(false);
    }
  }, [lastRound]);

  // Animate VS part
  useEffect(() => {
    if (lastRound && vsRef.current && !showResult) {
      gsap.fromTo(
        vsRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );

      const timer = setTimeout(() => setShowResult(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastRound, showResult]);

  // Animate result part
  useEffect(() => {
    if (showResult && resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "elastic.out(1, 0.6)",
          onComplete: () => {
            dispatch(setLoading(false));
          },
        }
      );
    }
  }, [showResult, dispatch]);

  if (!lastRound) {
    return (
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-primary text-center pt-70">
         PICK YOUR POSITIONS
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 rounded-xl text-center">
      {!showResult ? (
        <div
          ref={vsRef}
          className="text-5xl font-extrabold uppercase flex items-center gap-4"
        >
          <span className="flex items-center gap-8">
            <span className="text-white">
              {lastRound.bets.map((bet) => bet.move).join(" or ")}
            </span>
            <span className="text-primary text-3xl">VS</span>
            <span className="text-white">{lastRound.dealerMove}</span>
          </span>
        </div>
      ) : (
        <div
          ref={resultRef}
          className="w-full max-w-md mx-auto flex flex-col items-center space-y-4"
        >
          <h2
            className={`text-4xl font-extrabold ${
              lastRound.bets.some((b) => b.result === "win")
                ? "text-green-400"
                : lastRound.bets.some((b) => b.result === "tie")
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {lastRound.bets.some((b) => b.result === "win")
              ? `${lastRound.bets[0].move.toUpperCase()} WON`
              : lastRound.bets.some((b) => b.result === "tie")
              ? "TIE"
              : `${lastRound.dealerMove.toUpperCase()} WON`}
          </h2>
          <span className="flex items-center gap-2">
            <span className="text-xl font-semibold text-primary">YOU WIN</span>
            <span className="text-xl font-semibold text-white">
              {totalWon.toFixed(2)}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Round;
