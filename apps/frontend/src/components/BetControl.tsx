import { Group, Box, Button } from "@mantine/core";
import { MOVE_COLORS, MOVE_OPTIONS, moveIconMap, PRESET_BET_AMOUNTS } from "../const";
import {
  BetControlSelectedButtonStyle,
  BetControlWrapperStyle,
} from "./styles";
import { LobbyFooterControlsProps } from "./model";
import { useDispatch } from "react-redux";
import { setBetAmount } from "../state/features/betSlice";


export default function BetControls({
  choice,
  loading,
  betAmount,
  wallet,
  handleChoice,
}: LobbyFooterControlsProps) {
  const dispatch = useDispatch();

  return (
    <Box style={BetControlWrapperStyle}>
      <Group mb="sm" gap={'6px'} align="center" justify="center">
        {PRESET_BET_AMOUNTS.map((amount) => (
          <Button
            key={amount}
            size="sm"
            variant={betAmount === amount ? "filled" : "outline"}
            onClick={() => {
              dispatch(setBetAmount(amount));
            }}
          >
            ${amount}
          </Button>
        ))}
      </Group>

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
