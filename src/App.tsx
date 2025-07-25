import "@mantine/core/styles.css";
import {
  MantineProvider,
  Paper,
  Group,
  Box,
  Title,
  Text,
  Button,
  NumberInput
} from "@mantine/core";
import { useEffect } from "react";
import Bets from "./Bets";
import { useDispatch, useSelector } from "react-redux";
import {
  addBet,
  setWallet,
  setBetAmount,
  setChoice,
  setLoading,
  setLastRound,
} from "./betSlice";
import type { RootState } from "./store";
import { connectWebSocket, sendBet } from "./ws";
import Round from "./Round";
import { moveIconMap } from "./const";

export default function App() {
  const dispatch = useDispatch();
  const { wallet, betAmount, choice, loading, lastRound } = useSelector(
    (state: RootState) => state.bets
  );

  useEffect(() => {
    connectWebSocket();
  }, []);

  const handleChoice = (move: string) => {
    if (betAmount > 0 && betAmount <= wallet) {
      dispatch(setChoice(move));
    }
  };

  const handlePlay = () => {
    if (!choice || betAmount < 1 || betAmount > wallet) return;
    dispatch(setLoading(true));
    sendBet(choice, betAmount);
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      <Box style={{ minHeight: "100vh", height: "100vh", display: "flex", flexDirection: "column" }}>
        <Group align="stretch" style={{ height: "100vh" }}>
          <Box
            style={{
              flex: 2,
              minHeight: 0,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
             
               <Round lastRound={lastRound} />
            </Box>

            {/* Fixed Footer */}
            <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 24, background: "var(--mantine-color-dark-7)", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, zIndex: 2 }}>
              <Group justify="space-between" align="center">
                <Text fw={700} size="lg">Wallet: ${wallet}</Text>
              
                <Group gap="md">
  <Button
    color="teal"
    size={choice === "rock" ? "xl" : "default"}
    onClick={() => handleChoice("rock")}
    disabled={loading || betAmount < 1 || betAmount > wallet}
    variant={choice === "rock" ? "outline" : "filled"}
    style={choice === "rock" ? { borderWidth: 3, borderColor: "#00b894" } : {}}
  >
    Rock {moveIconMap['rock'].smallIcon}
  </Button>
  <Button
    color="blue"
    size={choice === "paper" ? "xl" : "default"}

    onClick={() => handleChoice("paper")}
    disabled={loading || betAmount < 1 || betAmount > wallet}
    variant={choice === "paper" ? "outline" : "filled"}
    style={choice === "paper" ? { borderWidth: 3, borderColor: "#339af0" } : {}}
  >
    Paper {moveIconMap['paper'].smallIcon}
  </Button>
  <Button
    color="red"
    size={choice === "scissors" ? "xl" : "default"}
    onClick={() => handleChoice("scissors")}
    disabled={loading || betAmount < 1 || betAmount > wallet}
    variant={choice === "scissors" ? "outline" : "filled"}
    style={choice === "scissors" ? { borderWidth: 3, borderColor: "#fa5252" } : {}}
  >
    Scissors {moveIconMap['scissors'].smallIcon}
  </Button>
</Group>
                <Group justify="center" align="center" dir="col">
                <NumberInput
                  value={betAmount}
                  onChange={(val) => dispatch(setBetAmount(Number(val) || 0))}
                  min={1}
                  max={wallet}
                  step={1}
                  label="Bet Amount"
                  hideControls
                  styles={{ input: { width: 100 } }}
                />
                <Button
                  size="xl"
                  color="yellow"
                  radius="xl"
                  style={{ fontWeight: 900, fontSize: 28, minWidth: 160 }}
                  onClick={handlePlay}
                  disabled={!choice || betAmount < 1 || betAmount > wallet || loading}
                  loading={loading}
                >
                  PLAY
                </Button>
                </Group>
              </Group>
            </Box>
          </Box>

          <Paper shadow="md" radius="md" p="xl" style={{ flex: 1, minWidth: 280, minHeight: 0, height: "100%" }}>
            <Bets />
          </Paper>
        </Group>
      </Box>
    </MantineProvider>
  );
}
