import { Box, Button, Group, Switch } from "@mantine/core";
import { memo } from "react";
import {
  LobbyFooterBoxStyle,
  LobbyFooterControlsWrapperStyle,
  LobbyFooterSwitchesStyle,
} from "./styles";
import { LobbyFooterProps } from "./model";

function LobbyFooter({
  choice,
  loading,
  betAmount,
  autoplay,
  autoplayChecked,
  shuffle,
  handlePlay,
  onToggleAutoplay,
  onToggleShuffle,
}: LobbyFooterProps) {
  return (
    <Box style={LobbyFooterBoxStyle}>
      <Group justify="space-between" align="center" wrap="nowrap">
        <Box style={LobbyFooterControlsWrapperStyle}>
          <Box style={LobbyFooterSwitchesStyle}>
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
            size="xl"
            color="yellow"
            radius="xl"
            mt="50"
            style={{ fontWeight: 900, fontSize: 28, minWidth: 240 }}
            onClick={() => handlePlay(true)}
            disabled={(!choice && !shuffle) || betAmount < 1 || loading}
            loading={loading}
          >
            {autoplay ? "STOP" : "PLAY"}
          </Button>
        </Box>
      </Group>
    </Box>
  );
}

export default memo(LobbyFooter);
