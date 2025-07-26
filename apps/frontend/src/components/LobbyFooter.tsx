import { Box, Button, Group, Switch } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  LobbyFooterBoxStyle,
  LobbyFooterControlsWrapperStyle,
  LobbyFooterPlayStyle,
  LobbyFooterSwitchesStyle,
} from "./styles";
import { LobbyFooterProps } from "./model";
import BetControls from "./BetControl";
import { memo } from "react";
import WalletDisplay from "./Wallet";

function LobbyFooter({
  choice,
  loading,
  betAmount,
  autoplay,
  autoplayChecked,
  shuffle,
  wallet,
  handleChoice,
  handlePlay,
  onToggleAutoplay,
  onToggleShuffle,
}: LobbyFooterProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box style={LobbyFooterBoxStyle(isMobile)}>
      <Group
        justify="space-between"
        align="center"
        wrap="wrap"
        gap={isMobile ? "md" : "lg"}
        w='100%'
      >
        <BetControls
          betAmount={betAmount}
          choice={choice}
          loading={loading}
          handleChoice={handleChoice}
          wallet={wallet}
        />

        <Box style={LobbyFooterControlsWrapperStyle(isMobile)}>
          <Box style={LobbyFooterSwitchesStyle(isMobile)}>
            <Switch
              label="Autoplay"
              checked={autoplayChecked}
              onChange={(e) => onToggleAutoplay(e.currentTarget.checked)}
            />
            <Switch
              label="Shuffle"
              checked={shuffle}
              onChange={(e) => onToggleShuffle(e.currentTarget.checked)}
            />
          </Box>

          <Button
            size={isMobile ? "lg" : "xl"}
            color="yellow"
            radius="xl"
            mt={isMobile ? "sm" : "md"}
            style={LobbyFooterPlayStyle}
            onClick={() => handlePlay(true)}
            disabled={(!choice && !shuffle) || betAmount < 1 || loading}
            loading={loading}
          >
            {autoplay ? "STOP" : "PLAY"}
          </Button>
          {isMobile ? (
            <WalletDisplay isMobile={isMobile} wallet={wallet} />
          ) : null}
        </Box>
      </Group>
    </Box>
  );
}

export default memo(LobbyFooter);
