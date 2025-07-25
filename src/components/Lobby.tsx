import "@mantine/core/styles.css";
import {
  MantineProvider,
  Paper,
  Group,
  Box,
  Button,
  Switch,
} from "@mantine/core";
import { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChoice, setLoading } from "./../state/features/betSlice";
import type { RootState } from "./../state/store";
import { connectWebSocket, sendBet } from "./../actions/ws";
import Round from "./../components/Round";
import Bets from "./../components/Bets";
import WalletDisplay from "./../components/Wallet";
import BetControls from "./../components/BetControl";
import { setAutoplay, setAutoplayChecked, setShuffle } from "../state/features/gameSlice";

export default function Lobby() {
  const dispatch = useDispatch();
  const { wallet, betAmount, choice, loading, lastRound } = useSelector(
    (state: RootState) => state.bets
  );
  const { autoplay, autoplayChecked, shuffle } = useSelector(
    (state: RootState) => state.game
  );
  
  console.log(loading, betAmount, choice)
  
   // todo fix autoplay
  useEffect(() => {
    if (autoplay && !loading && betAmount > 0 && betAmount <= wallet) {
      const timer = setTimeout(() => {
        handlePlay(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lastRound]);

  const handleChoice = useCallback((move: string) => {
    if (betAmount > 0 && betAmount <= wallet) {
      dispatch(setChoice(move));
    }
  }, [betAmount, wallet]);

  const handlePlay = useCallback((manual = true) => {
    if (autoplay && manual) {
      dispatch(setAutoplay(false));
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

    if (manual && autoplayChecked) {
      setAutoplay(true);
    }
  }, [choice, shuffle, betAmount, wallet, autoplay, autoplayChecked]);

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
            <Box style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <Round lastRound={lastRound} />
            </Box>
            <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 24, background: "var(--mantine-color-dark-7)", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, zIndex: 2 }}>
              <Group justify="space-between" align="center" wrap="nowrap">
                <WalletDisplay wallet={wallet} />
                <BetControls
                  choice={choice}
                  loading={loading}
                  betAmount={betAmount}
                  wallet={wallet}
                  handleChoice={handleChoice}
                />
                <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <Switch
                      label="Autoplay"
                      checked={autoplayChecked}
                      onChange={(e) => dispatch(setAutoplayChecked(e.currentTarget.checked))}
                    />
                    <Switch label="Shuffle" checked={shuffle} onChange={(event) => dispatch(setShuffle(event.currentTarget.checked))} />
                  </Box>
                  <Button
                    size="xl"
                    color="yellow"
                    radius="xl"
                    mt="50"
                    style={{ fontWeight: 900, fontSize: 28, minWidth: 240 }}
                    onClick={() => handlePlay(true)}
                    disabled={!choice && !shuffle || betAmount < 1 || betAmount > wallet || loading}
                    loading={loading}
                  >
                    {autoplay ? "STOP" : "PLAY"}
                  </Button>
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
