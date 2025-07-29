import { memo } from "react";
import Chip from "./Chip";
import { ChoiceCardProps } from "./model";

const BOX_COLORS = {
  rock: {
    classes: "border-blue-600 bg-blue-900 text-blue-300",
    shadow: "rgba(37, 99, 235, 1)",
  },
  paper: {
    classes: "border-green-600 bg-green-900 text-green-300",
    shadow: "rgba(22, 163, 74, 1)", 
  },
  scissors: {
    classes: "border-red-600 bg-red-900 text-red-300",
    shadow: "rgba(220, 38, 38, 1)", 
  },
};

function ChoiceCard({ move, isSelected, isDisabled, onSelect }: ChoiceCardProps) {
  const { classes, shadow } = BOX_COLORS[move as keyof typeof BOX_COLORS] || {
    classes: "border-gray-600 bg-gray-800 text-gray-300",
    shadow: "rgba(75, 85, 99, 1)", 
  };

  return (
    <div
      className={`relative flex flex-col items-center w-40 h-48 rounded-lg shadow-lg transition-all duration-200 cursor-pointer
        ${classes} border-4
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={{
        boxShadow: isSelected ? `0 0 0 4px ${shadow}` : "none",
      }}
      onClick={() => !isDisabled && onSelect()}
    >
      {isSelected && <Chip />}
      <div className="flex-1 flex flex-col justify-center items-center w-full h-full">
        <span className="text-2xl font-bold uppercase tracking-wide mb-2">
          {move}
        </span>
      </div>
    </div>
  );
}

export default memo(ChoiceCard);
