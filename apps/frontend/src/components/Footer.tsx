import { MOVE_OPTIONS } from "../const";
import { LobbyFooterProps } from "./model";
import { memo } from "react";
import Choice from "./Choice";

function Footer({
  choices,
  loading,
  lastRound,
  onChoice,
  onClear,
  onPlay,
}: LobbyFooterProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 rounded-t-lg space-y-8">
      <div className="flex justify-center gap-8">
        {MOVE_OPTIONS.map((move) => {
          const isSelected = choices.includes(move);
          const isDisabled = loading || (!isSelected && choices.length >= 2);

          return (
            <Choice
              key={move}
              move={move}
              isSelected={isSelected}
              isDisabled={isDisabled}
              onSelect={() => onChoice(move)}
            />
          );
        })}
      </div>
      <button
      className="mt-8 px-12 py-3 rounded-full font-bold text-primary bg-black border-2 border-primary 
                hover:bg-primary hover:text-black text-2xl shadow-lg transition-all cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={lastRound ? onClear : onPlay}
      disabled={loading}
    >
      {!lastRound ? "PLAY" : "CLEAR"}
    </button>
    </div>
  );
}

export default memo(Footer);
