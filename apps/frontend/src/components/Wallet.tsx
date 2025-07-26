import { memo } from "react";
import { Box, Text } from "@mantine/core";

const WalletDisplay = memo(({ wallet }: { wallet: number }) => (
  <Box
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
    }}
  >
    <Text fw={700} size="xl">
      Your Wallet
    </Text>
    <Text
      key={wallet}
      style={{
        fontSize: 50,
        color: "gold",
        animation: "walletChange 0.4s ease-in-out",
      }}
    >
      {wallet}
    </Text>
  </Box>
));

export default WalletDisplay;
