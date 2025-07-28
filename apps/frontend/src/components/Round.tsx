import { IBetsProps } from "./model";

const Round = ({ lastRound }: IBetsProps) => {
  if (!lastRound) {
    return (
      <div className="flex items-center justify-center rounded-xl bg-gray-800 p-6">
        <h2 className="text-2xl font-bold text-gray-400">
          SELECT ONE AND START YOUR FIRST BET!
        </h2>
      </div>
    );
  }

  const isDraw = lastRound.result === "draw";
  const isPlayerWinner = lastRound.result === "win";
  const isDealerWinner = lastRound.result === "lose";

  const getCardBg = (isWinner: boolean) => {
    if (isDraw) return "bg-gradient-to-br from-gray-800 to-gray-900";
    if (isWinner) return "bg-gradient-to-br from-green-500 to-green-800";
    return "bg-gradient-to-br from-red-600 to-red-900";
  };

  return (
    <div className="w-full h-full text-center flex flex-col items-center justify-center p-6 rounded-xl bg-gray-900">
      <h1
        className={`mb-8 text-4xl font-extrabold ${
          lastRound.result === "win"
            ? "text-green-400"
            : lastRound.result === "lose"
              ? "text-red-400"
              : "text-yellow-400"
        }`}
      >
        {lastRound.result.toUpperCase()}!
      </h1>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl">
        <div
          className={`flex-1 rounded-md border border-gray-700 p-6 text-white text-center ${getCardBg(
            isPlayerWinner,
          )}`}
        >
          <h3 className="text-xl font-semibold mt-2">YOU</h3>
          <div className="mt-4 flex justify-center">
           { lastRound.playerMove}
          </div>
          <p className="mt-2 text-gray-300">
            {lastRound.playerMove.toUpperCase()}
          </p>
        </div>

        <div
          className={`flex-1 rounded-md border border-gray-700 p-6 text-white text-center ${getCardBg(
            isDealerWinner,
          )}`}
        >
          <h3 className="text-xl font-semibold mt-2">DEALER</h3>
          <div className="mt-4 flex justify-center">
            {lastRound.dealerMove}
          </div>
          <p className="mt-2 text-gray-300">
            {lastRound.dealerMove.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Round;
