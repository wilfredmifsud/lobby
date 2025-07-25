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
  Switch
} from "@mantine/core";
import { useEffect, useState } from "react";
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

  const [autoplay, setAutoplay] = useState(false);
  const [autoplayChecked, setAutoplayChecked] = useState(false); 
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    connectWebSocket();
  }, []);

  useEffect(() => {
    if (autoplay && !loading && choice && betAmount > 0 && betAmount <= wallet) {
      const timer = setTimeout(() => {
        handlePlay();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [lastRound]);

  const handleChoice = (move: string) => {
    if (betAmount > 0 && betAmount <= wallet) {
      dispatch(setChoice(move));
    }
  };

  const handlePlay = (manual = true) => {
    if (autoplay && manual) {
      // STOP was clicked
      setAutoplay(false);
      return;
    }
  
    let selectedMove = choice;
    if (shuffle) {
      const choices = ["rock", "paper", "scissors"];
      selectedMove = choices[Math.floor(Math.random() * choices.length)];
      dispatch(setChoice(selectedMove));
    }
  
    if (!selectedMove || betAmount < 1 || betAmount > wallet) return;
  
    dispatch(setLoading(true));
    sendBet(selectedMove, betAmount);
  
    // Enable autoplay after first click, if toggle is on
    if (manual && autoplayChecked) {
      setAutoplay(true);
    }
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

            <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 24, background: "var(--mantine-color-dark-7)", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, zIndex: 2 }}>
              <Group justify="space-between" align="center" wrap="nowrap">
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Text fw={700} size="xl">Your Wallet</Text>
              <Text
  key={wallet} 
  style={{
    fontSize: 50,
    color: 'gold',
    animation: 'walletChange 0.4s ease-in-out'
  }}
>
  {wallet}
</Text>


</Box>

                <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <NumberInput value={betAmount} onChange={(val) => dispatch(setBetAmount(Number(val) || 0))} min={1} max={wallet} step={1} label="Bet Amount" hideControls styles={{ input: { width: 100 } }} />

                <Group gap="md">
                  <Button size="xl" color="teal" onClick={() => handleChoice("rock")} disabled={loading || betAmount < 1 || betAmount > wallet} variant={choice === "rock" ? "filled" : "outline"} style={choice === "rock" ? { borderWidth: 3, borderColor: "#00b894", } : {}}>
                    Rock {moveIconMap['rock'].smallIcon}
                  </Button>
                  <Button size="xl"  color="blue"  onClick={() => handleChoice("paper")} disabled={loading || betAmount < 1 || betAmount > wallet} variant={choice === "paper" ? "filled" : "outline"} style={choice === "paper" ? { borderWidth: 3, borderColor: "#339af0" } : {}}>
                    Paper {moveIconMap['paper'].smallIcon}
                  </Button>
                  <Button size="xl"  color="red"  onClick={() => handleChoice("scissors")} disabled={loading || betAmount < 1 || betAmount > wallet} variant={choice === "scissors" ? "filled" : "outline"} style={choice === "scissors" ? { borderWidth: 3, borderColor: "#fa5252" } : {}}>
                    Scissors {moveIconMap['scissors'].smallIcon}
                  </Button>
                </Group>
                </Box>
                <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Button
  size="xl"
  color="yellow"
  radius="xl"
  style={{ fontWeight: 900, fontSize: 28, minWidth: 160 }}
  onClick={() => handlePlay(true)}
  disabled={!choice || betAmount < 1 || betAmount > wallet || loading}
  loading={loading}
>
  {autoplay ? "STOP" : "PLAY"}
</Button>


                  <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                  <Switch
  label="Autoplay"
  checked={autoplayChecked}
  onChange={(e) => setAutoplayChecked(e.currentTarget.checked)}
/>
                  <Switch label="Shuffle" checked={shuffle} onChange={(event) => setShuffle(event.currentTarget.checked)} />
                    </Box>
                </Box>
              </Group>
            </Box>
          </Box>

          <Paper shadow="md" radius="md" p="xl" style={{ flex: 1, minWidth: 280, minHeight: 0, height: "100%", overflow: "auto" }}>
            <Bets />
          </Paper>
        </Group>
      </Box>
    </MantineProvider>
  );
}