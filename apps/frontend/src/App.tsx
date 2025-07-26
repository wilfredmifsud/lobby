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
import { setChoice, setLoading } from "./state/features/betSlice";
import type { RootState } from "./state/store";
import { connectWebSocket, sendBet } from "./actions/ws";
import Round from "./components/Round";
import Bets from "./components/Bets";
import WalletDisplay from "./components/Wallet";
import BetControls from "./components/BetControl";
import Lobby from "./components/Lobby";
import ConnectionErrorOverlay from "./components/Error";

export default function App() {
  useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Lobby />
      <ConnectionErrorOverlay />
    </MantineProvider>
  );
}
