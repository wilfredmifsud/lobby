import { handleBetResult, handleError, handleInit, handleNoCredits } from "./handlers";
import { WSMessage } from "./model";
import { setConnectionError } from "../state/features/gameSlice"; // or wherever your reducer is
import { store } from "../state/store";

let ws: WebSocket | null = null;
export let reconnectTimeout: NodeJS.Timeout;

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3000";

export const connectWebSocket = () => {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log("WebSocket connected");
    ws?.send(JSON.stringify({ type: "CLIENT_CONNECTED" }));
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
    reconnectTimeout = setTimeout(connectWebSocket, 3000);
  };

  ws.onerror = (e) => {
    const msg = "Server disconnected";
    store.dispatch(setConnectionError(msg));
    console.error(msg, e);
  };
};

export const sendBet = (move: string, amount: number) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "BET", move, amount }));
  } else {
    const msg = "Server not ready yet. bet failed!";
    store.dispatch(setConnectionError(msg));
    console.warn(msg);
  }
};
