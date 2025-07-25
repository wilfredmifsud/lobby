import "@mantine/core/styles.css";
import {
  MantineProvider,
  Paper,
  Group,
  Box,
  Title,
  Text,
  Button,
  NumberInput,
  Loader,
} from "@mantine/core";
import { useRef, useEffect } from "react";
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

function getResultText(
  win: boolean | null,
  playerMove: string,
  dealerMove: string
): "win" | "lose" | "draw" {
  if (playerMove === dealerMove) return "draw";
  return win ? "win" : "lose";
}

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
      dispatch(setLastRound(null));
    }
  };

  const handlePlay = () => {
    if (!choice || betAmount < 1 || betAmount > wallet) return;
    dispatch(setLoading(true));
    dispatch(setLastRound(null));
    sendBet(choice, betAmount);
  };
  

  return (
    <MantineProvider defaultColorScheme="dark">
      <Box style={{ minHeight: "100vh", height: "100vh", display: "flex", flexDirection: "column" }}>
        <Group align="flex-start" gap="xl" style={{ flex: 1, height: "100%" }}>
          {/* Game Area (Left) */}
          <Box style={{ flex: 2, minHeight: 0, position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
            <Paper shadow="md" radius="md" p="xl" style={{ flex: 1, marginBottom: 140, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <Title order={2} mb="md">Game Area</Title>
              {lastRound && (
                <Box mt="xl" p="md" style={{ background: "var(--mantine-color-dark-5)", borderRadius: 8 }}>
                  <Text size="lg" fw={700} c="yellow">Result: {lastRound.result.toUpperCase()}</Text>
                  <Text mt="sm">You played: <b>{lastRound.playerMove}</b></Text>
                  <Text>Dealer played: <b>{lastRound.dealerMove}</b></Text>
                </Box>
              )}
              {choice && (
                <Text mt="xl" size="lg" fw={700} c="teal">
                  You have chosen {choice.toUpperCase()}!
                </Text>
              )}
              {loading && (
                <Group mt="xl"><Loader size="md" color="teal" /> <Text>Waiting for result...</Text></Group>
              )}
            </Paper>

            {/* Fixed Footer */}
            <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 24, background: "var(--mantine-color-dark-7)", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, zIndex: 2 }}>
              <Group justify="space-between" align="center">
                <Text fw={700} size="lg">Wallet: ${wallet}</Text>
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
                <Group gap="md">
                  <Button color="teal" size="md" onClick={() => handleChoice("rock")} disabled={loading || betAmount < 1 || betAmount > wallet}>Rock</Button>
                  <Button color="blue" size="md" onClick={() => handleChoice("paper")} disabled={loading || betAmount < 1 || betAmount > wallet}>Paper</Button>
                  <Button color="red" size="md" onClick={() => handleChoice("scissors")} disabled={loading || betAmount < 1 || betAmount > wallet}>Scissors</Button>
                </Group>
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
            </Box>
          </Box>

          {/* Sidebar */}
          <Paper shadow="md" radius="md" p="xl" style={{ flex: 1, minWidth: 280, minHeight: 0, height: "100%" }}>
            <Bets />
          </Paper>
        </Group>
      </Box>
    </MantineProvider>
  );
}