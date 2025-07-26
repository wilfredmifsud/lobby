import { memo } from "react";
import { Box, Group, Text } from "@mantine/core";
import { BetControlWrapperStyle, WalletTextStyle } from "./styles";

const WalletDisplay = memo(
  ({ wallet, isMobile }: { isMobile: boolean; wallet: number }) => (
    <Box style={BetControlWrapperStyle}>
      <Text>Your Wallet:</Text>
      <Text key={wallet} style={WalletTextStyle(isMobile)}>
        {wallet}
      </Text>
    </Box>
  ),
);

export default WalletDisplay;
