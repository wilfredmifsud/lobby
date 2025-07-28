import { LobbyFooterProps } from "./model";
import BetControls from "./BetControl";
import { memo } from "react";

function LobbyFooter({
  choice,
  loading,
  betAmount,
  wallet,
  handleChoice,
  handlePlay,
}: LobbyFooterProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-gray-800 shadow-inner rounded-t-lg space-y-6">
      <div className="w-full flex flex-wrap items-center justify-center gap-6">
        <BetControls
          betAmount={betAmount}
          choice={choice}
          loading={loading}
          handleChoice={handleChoice}
          wallet={wallet}
        />

        <div className="flex items-center justify-center mt-4">
          <button
            className="px-6 py-2 rounded-full font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
            onClick={() => handlePlay(true)}
            disabled={!!choice || betAmount < 1 || loading}
          >
            {loading ? "Loading..." : "PLAY"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(LobbyFooter);
