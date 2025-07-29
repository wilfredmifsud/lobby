import {
  handleBetResult,
  handleError,
  handleInit,
  handleNoCredits,
} from "./handlers";
import { WSMessage } from "./model";
import { setConnectionError } from "../state/features/betSlice";
import { store } from "../state/store";

let ws: WebSocket | null = null;
// @ts-ignore
export let reconnectTimeout: NodeJS.Timeout;
// @ts-ignore
let keepAliveInterval: NodeJS.Timeout;

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3000";
const KEEP_ALIVE_INTERVAL = 20000; // 20 seconds
let reconnectAttempts = 0;

export const connectWebSocket = () => {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket(WS_URL)!;

  ws.onopen = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "CLIENT_CONNECTED" }));

      reconnectAttempts = 0; // reset on success
      clearInterval(keepAliveInterval);
      keepAliveInterval = setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "PING" }));
        }
      }, KEEP_ALIVE_INTERVAL);
    } else {
      console.warn("WebSocket onopen fired but readyState is not OPEN.");
    }
  };

  ws.onmessage = (event) => {
    try {
      const data: WSMessage = JSON.parse(event.data);

      switch (data.type) {
        case "INIT":
          handleInit(data);
          break;
        case "BET_RESULT":
          handleBetResult(data);
          break;
        case "NO_CREDITS":
          handleNoCredits();
          break;
        case "ERROR":
          handleError();
          break;
      }
    } catch (err) {
      const msg = "Failed to parse WebSocket message:";
      store.dispatch(setConnectionError(msg));
      console.error(msg, event.data);
    }
  };

  ws.onclose = () => {
    const msg = "Server disconnected, attempting to reconnect...";
    console.warn(msg);
    store.dispatch(setConnectionError(msg));
    clearInterval(keepAliveInterval);
    clearTimeout(reconnectTimeout);

    const delay = Math.min(10000, 1000 * 2 ** reconnectAttempts++);
    reconnectTimeout = setTimeout(connectWebSocket, delay);
  };

  ws.onerror = (e) => {
    const msg = "WebSocket error occurred";
    store.dispatch(setConnectionError(msg));
    console.error(msg, e);
  };
};

export const sendBet = (bets: string[]) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "BET", bets }));
  } else {
    const msg = "Bet failed!";
    store.dispatch(setConnectionError(msg));
    console.warn(msg);
  }
};

// Reconnect when the tab becomes visible (especially for mobile devices)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    setTimeout(() => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        connectWebSocket();
      }
    }, 300);
  }
});
