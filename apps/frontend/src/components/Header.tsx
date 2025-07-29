import { HeaderProps } from "./model";
import { memo } from "react";

function Header({ wallet, bet, win }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-center py-2 px-4 bg-black text-sm font-semibold shadow-md z-50">
      <div className="flex space-x-6">
        <span>
          <span className="text-primary">BALANCE:</span>{" "}
          <span className="text-white">{wallet}</span>
        </span>
        <span>
          <span className="text-primary">BET:</span>{" "}
          <span className="text-white">{bet}</span>
        </span>
        <span>
          <span className="text-primary">WIN:</span>{" "}
          <span className="text-white">{win}</span>
        </span>
      </div>
    </div>
  );
}

export default memo(Header);
