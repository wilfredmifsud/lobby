import { Group, Box, Button, NumberInput } from "@mantine/core";
import { MOVE_COLORS, MOVE_OPTIONS, moveIconMap } from "../const";
import {
  BetControlNumberInputStyles,
  BetControlSelectedButtonStyle,
  BetControlWrapperStyle,
} from "./styles";
import { LobbyFooterControlsProps } from "./model";

export default function BetControls({
  choice,
  loading,
  betAmount,
  wallet,
  handleChoice,
}: LobbyFooterControlsProps) {
  return (
    <Box style={BetControlWrapperStyle}>
      <NumberInput
        value={betAmount}
        onChange={() => handleChoice("")}
        min={1}
        max={wallet}
        step={1}
        label="Bet Amount"
        hideControls
        styles={BetControlNumberInputStyles}
      />
      <Group gap="md">
        {MOVE_OPTIONS.map((move) => (
          <Button
            key={move}
            size="xl"
            color={MOVE_COLORS[move]}
            onClick={() => handleChoice(move)}
            disabled={loading || betAmount < 1 || betAmount > wallet}
            variant={choice === move ? "filled" : "outline"}
            style={choice === move ? BetControlSelectedButtonStyle : {}}
          >
            {moveIconMap[move].smallIcon}
          </Button>
        ))}
      </Group>
    </Box>
  );
}
