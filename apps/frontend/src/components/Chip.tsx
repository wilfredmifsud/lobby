import { memo } from "react";
import { BET_VALUE } from "../const";

function Chip() {
  return (
    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
      <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-blue-500 bg-white text-blue-500 text-lg font-bold shadow-lg">
           {BET_VALUE}
      </div>
    </div>
  );
}

export default memo(Chip);
