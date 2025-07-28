import { memo, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WalletDisplay = memo(({ wallet }: { wallet: number }) => {
  const [displayedWallet, setDisplayedWallet] = useState(wallet);
  const walletRef = useRef(wallet);

  useEffect(() => {
    const obj = { val: walletRef.current };
    gsap.to(obj, {
      val: wallet,
      duration: 0.3,
      ease: "power1.out",
      onUpdate: () => {
        setDisplayedWallet(parseFloat(obj.val.toFixed(0)));
      },
    });
    walletRef.current = wallet;
  }, [wallet]);

  return (
    <div className="flex items-center space-x-2 bg-gray-900 px-4 py-2 rounded-lg shadow">
      <span className="text-white text-sm font-medium">Your Wallet:</span>
      <span className="text-yellow-400 text-lg font-bold">${displayedWallet}</span>
    </div>
  );
});

export default WalletDisplay;
