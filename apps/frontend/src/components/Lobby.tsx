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
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChoice, setLoading } from "./../state/features/betSlice";
import type { RootState } from "./../state/store";
import { sendBet } from "./../actions/ws";
import Round from "./../components/Round";
import Bets from "./../components/Bets";
import {
  setAutoplay,
  setAutoplayChecked,
  setShuffle,
} from "../state/features/gameSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import LobbyFooter from "./LobbyFooter";

import {
  LobbyContainerStyle,
  LobbyGroupStyle,
  LobbyMainBoxStyle,
  LobbyBurgerBoxStyle,
  LobbyRoundBoxStyle,
  LobbyDrawerPaperStyle,
} from "./styles";

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
        dispatch(setAutoplay(false));
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

  useEffect(() => {
    if (autoplay && !loading && betAmount > 0 && betAmount <= wallet) {
      const timer = setTimeout(() => {
        handlePlay(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lastRound, autoplay, loading, betAmount, wallet, handlePlay]);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Box style={LobbyContainerStyle}>
        <Group align="stretch" style={LobbyGroupStyle}>
          <Box style={LobbyMainBoxStyle}>
            {isMobile && (
              <Box p="md" style={LobbyBurgerBoxStyle}>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  aria-label="Toggle sidebar"
                />
              </Box>
            )}

            <Box style={LobbyRoundBoxStyle}>
              <Round lastRound={lastRound} />
            </Box>

            <LobbyFooter
              wallet={wallet}
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

          {isMobile ? (
            <Drawer
              opened={opened}
              onClose={close}
              padding="m"
              size="80%"
              position="right"
              overlayProps={{ opacity: 0.55, blur: 3 }}
              zIndex={99999}
              transitionProps={{ transition: "slide-left", duration: 300 }}
            >
              <Bets />
            </Drawer>
          ) : (
            <Paper shadow="md" radius="md" p="xl" style={LobbyDrawerPaperStyle}>
              <Bets />
            </Paper>
          )}
        </Group>
      </Box>
    </MantineProvider>
  );
}
