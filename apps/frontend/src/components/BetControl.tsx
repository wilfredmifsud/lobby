import {
    Group,
    Box,
    Button,
    NumberInput,
  } from "@mantine/core";
import { memo } from "react";
import { moveIconMap } from "../const";

  
const BetControls = memo(({
    choice,
    loading,
    betAmount,
    wallet,
    handleChoice,
  }: {
    choice: string | null;
    loading: boolean;
    betAmount: number;
    wallet: number;
    handleChoice: (move: string) => void;
  }) => (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <NumberInput
        value={betAmount}
        onChange={(val) => handleChoice("")}
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
        {["rock", "paper", "scissors"].map((move) => (
          <Button
            key={move}
            size="xl"
            color={move === "rock" ? "teal" : move === "paper" ? "blue" : "red"}
            onClick={() => handleChoice(move)}
            disabled={loading || betAmount < 1 || betAmount > wallet}
            variant={choice === move ? "filled" : "outline"}
            style={choice === move ? { borderWidth: 3, borderColor: "#ccc" } : {}}
          >
            {move.charAt(0).toUpperCase() + move.slice(1)} {moveIconMap[move].smallIcon}
          </Button>
        ))}
      </Group>
    </Box>
  ));
  

  export default BetControls;