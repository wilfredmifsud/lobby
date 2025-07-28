import {  MOVE_COLORS, MOVE_OPTIONS} from "../const";
import { LobbyFooterControlsProps } from "./model";
import { useDispatch } from "react-redux";
import { setBetAmount } from "../state/features/betSlice";

export default function BetControls({
  choice,
  loading,
  betAmount,
  wallet,
  handleChoice,
}: LobbyFooterControlsProps) {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-900 rounded-lg shadow-md">
    
      <div className="flex justify-center gap-4">
        {MOVE_OPTIONS.map((move) => {
          const isDisabled = loading || betAmount < 1 || betAmount > wallet;

          return (
            <button
              key={move}
              className={`w-14 h-14 flex items-center justify-center rounded-full border-2 text-white text-xl transition
                ${
                  choice === move
                    ? "ring-4 ring-offset-2 ring-blue-500 border-transparent"
                    : "border-gray-400 hover:border-white"
                }
                ${
                  MOVE_COLORS[move] || "bg-gray-700"
                }
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isDisabled}
              onClick={() => handleChoice(move)}
            >
             {move}
            </button>
          );
        })}
      </div>
    </div>
  );
}
