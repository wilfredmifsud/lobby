import { store } from "./store";
import {
  setWallet,
  setLastRound,
  addBet,
  setLoading,
} from "./betSlice";

let ws: WebSocket | null = null;
let reconnectTimeout: NodeJS.Timeout;

function getResultText(win: boolean | null, playerMove: string, dealerMove: string): "win" | "lose" | "draw" {
  if (playerMove === dealerMove) return "draw";
  return win ? "win" : "lose";
}

export const connectWebSocket = () => {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => {
    console.log("✅ WS connected");
    ws!.send(JSON.stringify({ type: "INIT" }));
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      const dispatch = store.dispatch;

      switch (data.type) {
        case "INIT":
          dispatch(setWallet(data.wallet));
          break;
        case "BET_RESULT":
          const result = getResultText(data.win, data.playerMove, data.dealerMove);
          dispatch(setLastRound({ playerMove: data.playerMove, dealerMove: data.dealerMove, result }));
          dispatch(setWallet(data.wallet));
          dispatch(setLoading(false));
          dispatch(addBet({
            user: "You",
            amount: data.amount,
            bet: data.playerMove,
            dealerMove: data.dealerMove,
            result,
            round: data.round
          }));
          break;
        case "NO_CREDITS":
        case "ERROR":
          dispatch(setLoading(false));
          break;
        default:
          break;
      }
    } catch (err) {
      console.error("❌ WS error", event.data);
    }
  };

  ws.onclose = () => {
    console.warn("🔌 WS closed, reconnecting...");
    reconnectTimeout = setTimeout(connectWebSocket, 3000);
  };

  ws.onerror = (e) => {
    console.error("❌ WS error", e);
  };
};

export const sendBet = (move: string, amount: number) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "BET", move, amount }));
  } else {
    console.warn("⛔ Cannot send BET — WS not ready");
  }
};
