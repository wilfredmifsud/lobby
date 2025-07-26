import "@mantine/core/styles.css";
import {
  MantineProvider,
  Paper,
  Group,
  Box,
  Button,
  Switch,
  Drawer,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChoice, setLoading } from "./../state/features/betSlice";
import type { RootState } from "./../state/store";
import { connectWebSocket, sendBet } from "./../actions/ws";
import Round from "./../components/Round";
import Bets from "./../components/Bets";
import WalletDisplay from "./../components/Wallet";
import BetControls from "./LobbyFooter/BetControl";
import {
  setAutoplay,
  setAutoplayChecked,
  setShuffle,
} from "../state/features/gameSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import LobbyFooter from "./LobbyFooter/LobbyFooter";

export default function Lobby() {
  const dispatch = useDispatch();
  const { wallet, betAmount, choice, loading, lastRound } = useSelector(
    (state: RootState) => state.bets,
  );
  const { autoplay, autoplayChecked, shuffle } = useSelector(
    (state: RootState) => state.game,
  );

  const theme = useMantineTheme();
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const handleChoice = useCallback(
    (move: string) => {
      if (betAmount > 0 && betAmount <= wallet) {
        dispatch(setChoice(move));
      }
    },
    [betAmount, wallet],
  );

  const handlePlay = useCallback(
    (manual = true) => {
      if (manual && autoplay) {
        dispatch(setAutoplay(false)); // STOP clicked
        return;
      }

      let selectedMove = choice;
      if (shuffle || !choice) {
        const choices = ["rock", "paper", "scissors"];
        selectedMove = choices[Math.floor(Math.random() * choices.length)];
        dispatch(setChoice(selectedMove));
      }

      if (!selectedMove || betAmount < 1 || betAmount > wallet) return;

      dispatch(setLoading(true));
      sendBet(selectedMove, betAmount);

      if (manual && autoplayChecked) {
        dispatch(setAutoplay(true));
      }
    },
    [autoplay, autoplayChecked, shuffle, choice, betAmount, wallet, dispatch],
  );

  // Autoplay runner
  useEffect(() => {
    if (autoplay && !loading && betAmount > 0 && betAmount <= wallet) {
      const timer = setTimeout(() => {
        handlePlay(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lastRound, autoplay, loading, betAmount, wallet, handlePlay]);

  useEffect(() => {
    if (lastRound && isMobile) {
      open();
    }
  }, [lastRound, isMobile, open]);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Box
        style={{
          minHeight: "100vh",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            {isMobile && (
              <Box
                p="md"
                style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}
              >
                <Burger
                  opened={opened}
                  onClick={toggle}
                  aria-label="Toggle sidebar"
                />
              </Box>
            )}

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

            <LobbyFooter
              choice={choice}
              loading={loading}
              betAmount={betAmount}
              autoplay={autoplay}
              autoplayChecked={autoplayChecked}
              shuffle={shuffle}
              handleChoice={handleChoice}
              handlePlay={handlePlay}
              onToggleAutoplay={(checked) =>
                dispatch(setAutoplayChecked(checked))
              }
              onToggleShuffle={(checked) => dispatch(setShuffle(checked))}
            />
          </Box>

          {/* Right side: Sidebar */}
          {isMobile ? (
            <Drawer
              opened={opened}
              onClose={close}
              title="Recent Bets"
              padding="xl"
              size="80%"
              position="right"
              overlayProps={{ opacity: 0.55, blur: 3 }}
              transitionProps={{ transition: "slide-left", duration: 300 }}
            >
              <Bets />
            </Drawer>
          ) : (
            <Paper
              shadow="md"
              radius="md"
              p="xl"
              style={{
                flex: 1,
                minWidth: 280,
                minHeight: 0,
                height: "100%",
                overflow: "auto",
                backgroundColor: "var(--mantine-color-dark-6)",
              }}
            >
              <Bets />
            </Paper>
          )}
        </Group>
      </Box>
    </MantineProvider>
  );
}
