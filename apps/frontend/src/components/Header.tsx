import { HeaderProps } from "./model";
import { memo } from "react";

function Header({ wallet }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-center py-2 px-4 bg-black text-yellow-400 text-sm font-semibold shadow-md z-50">
      <div className="flex space-x-6">
        <span>BALANCE: {wallet}</span>
        <span>BET: XXX</span>
        <span>WIN: X</span>
      </div>
    </div>
  );
}

export default memo(Header);
