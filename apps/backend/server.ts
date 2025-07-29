import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const PORT = process.env.PORT || 3000;

const BET_AMOUNT = 500;
const STARTING_WALLET_AMOUNT = 5000;

/**
 * Mostly generated via AI as a mock backend to abstract it from react like a proper casino would
 * @returns
 */
function getRandomMove(): string {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWin(player: string, dealer: string): boolean | null {
  if (player === dealer) return null;
  if (
    (player === "rock" && dealer === "scissors") ||
    (player === "paper" && dealer === "rock") ||
    (player === "scissors" && dealer === "paper")
  )
    return true;
  return false;
}

function validateBets(
  bets: string[],
  wallet: number,
): { valid: boolean; message?: string } {
  if (!Array.isArray(bets) || bets.length === 0 || bets.length > 2) {
    return { valid: false, message: "You must bet on 1 or 2 positions only." };
  }
  const totalBet = bets.length * BET_AMOUNT;
  if (totalBet > wallet) {
    return { valid: false, message: "Not enough balance for these bets." };
  }
  const uniqueMoves = new Set(bets);
  if (uniqueMoves.size !== bets.length) {
    return { valid: false, message: "Duplicate positions are not allowed." };
  }
  if (uniqueMoves.size > 2) {
    return { valid: false, message: "Cannot bet on more than 2 positions." };
  }
  return { valid: true };
}

interface CustomWebSocket extends WebSocket {
  wallet: number;
}

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: CustomWebSocket) => {
  console.log("Client connected");
  ws.wallet = STARTING_WALLET_AMOUNT;

  ws.send(
    JSON.stringify({
      type: "SYSTEM",
      message: "Connected to WebSocket server",
    }),
  );

  ws.on("message", (message: string) => {
    try {
      const parsed = JSON.parse(message);

      if (parsed.type === "CLIENT_CONNECTED") {
        ws.send(
          JSON.stringify({
            type: "INIT",
            wallet: ws.wallet,
          }),
        );
        return;
      }

      if (parsed.type === "PING") {
        ws.send(JSON.stringify({ type: "PONG" }));
        return;
      }

      if (parsed.type === "BET") {
        const bets: string[] = parsed.bets;
        const validation = validateBets(bets, ws.wallet);

        if (!validation.valid) {
          ws.send(
            JSON.stringify({
              type: "ERROR",
              message: validation.message,
            }),
          );
          return;
        }

        const totalBet = bets.length * BET_AMOUNT;
        ws.wallet -= totalBet;

        const dealerMove = getRandomMove();
        let payout = 0;

        const results = bets.map((move) => {
          const win = determineWin(move, dealerMove);
          let result = "lose";
          let returned = 0;

          if (win === true) {
            result = "win";
            returned = bets.length === 1 ? BET_AMOUNT * 14 : BET_AMOUNT * 3;
            payout += returned;
          } else if (win === null) {
            result = "tie";
            returned = BET_AMOUNT;
            payout += returned;
          }

          return {
            move,
            amount: BET_AMOUNT,
            result,
            returned,
          };
        });

        ws.wallet += payout;

        const response = {
          type: "BET_RESULT",
          dealerMove,
          bets: results,
          wallet: ws.wallet,
          round: Date.now(),
          payout,
        };

        ws.send(JSON.stringify(response));
        return;
      }

      ws.send(
        JSON.stringify({
          type: "ERROR",
          message: "Unknown message type",
        }),
      );
    } catch (err) {
      console.error("Invalid message format:", message);
      ws.send(
        JSON.stringify({
          type: "ERROR",
          message: "Invalid JSON format",
        }),
      );
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
