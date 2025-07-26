import { Group, Box, Button, NumberInput } from "@mantine/core";
import { MOVE_COLORS, MOVE_OPTIONS, moveIconMap } from "../../const";
import { LobbyFooterControlsProps } from "./model";

export default function BetControls({
  choice,
  loading,
  betAmount,
  wallet,
  handleChoice,
}: LobbyFooterControlsProps) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <NumberInput
        value={betAmount}
        onChange={() => handleChoice("")}
        min={1}
        max={wallet}
        step={1}
        label="Bet Amount"
        hideControls
        styles={{
          input: {
            width: 140,
            height: 50,
            fontSize: 20,
            fontWeight: 700,
            textAlign: "center",
          },
          label: {
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 8,
          },
        }}
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
            style={
              choice === move ? { borderWidth: 3, borderColor: "#ccc" } : {}
            }
          >
            {move.charAt(0).toUpperCase() + move.slice(1)}{" "}
            {moveIconMap[move].smallIcon}
          </Button>
        ))}
      </Group>
    </Box>
  );
}
