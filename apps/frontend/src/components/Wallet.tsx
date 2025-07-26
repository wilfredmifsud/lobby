import { memo, useEffect, useRef, useState } from "react";
import { Box, Text } from "@mantine/core";
import gsap from "gsap";
import { BetControlWrapperStyle, WalletTextStyle } from "./styles";

const WalletDisplay = memo(
  ({ wallet, isMobile }: { isMobile: boolean; wallet: number }) => {
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
      <Box style={BetControlWrapperStyle}>
        <Text>Your Wallet:</Text>
        <Text style={WalletTextStyle(isMobile)}>${displayedWallet}</Text>
      </Box>
    );
  },
);

export default WalletDisplay;
