import "@mantine/core/styles.css";
import {  MantineProvider} from "@mantine/core";
import { useEffect,} from "react";
import { connectWebSocket } from "./actions/ws";
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
