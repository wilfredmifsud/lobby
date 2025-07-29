import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IBetsProps } from "./model";

const Round = ({ lastRound, totalWon }: IBetsProps) => {
  const [showResult, setShowResult] = useState(false);
  const vsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Animate Phase 1 (VS)
  useEffect(() => {
    if (lastRound && vsRef.current) {
      gsap.fromTo(
        vsRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );

      const timer = setTimeout(() => setShowResult(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastRound]);

  // Animate Phase 2 (Result)
  useEffect(() => {
    if (showResult && resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.6)" }
      );
    }
  }, [showResult]);

  if (!lastRound) {
    return (
      <div className="flex items-center justify-center rounded-xl bg-gray-800 p-6">
        <h2 className="text-2xl font-bold text-gray-400 text-center">
          SELECT ONE AND START YOUR FIRST BET!
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 rounded-xl text-center">
      {!showResult ? (
        <div
          ref={vsRef}
          className="text-5xl font-extrabold text-yellow-400 uppercase flex items-center gap-4"
        >
          {lastRound.bets.map((bet, idx) => (
            <span key={idx}>
              {bet.move} <span className="text-yellow-500">VS</span>{" "}
              {lastRound.dealerMove}
            </span>
          ))}
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
            <span className="text-xl font-semibold text-primary">
              YOU WIN
            </span>
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
