const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

function getRandomRPS() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWin(player, dealer) {
  if (player === dealer) return null; 
  if (
    (player === 'rock' && dealer === 'scissors') ||
    (player === 'paper' && dealer === 'rock') ||
    (player === 'scissors' && dealer === 'paper')
  ) return true;
  return false;
}

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('⚡ Client connected');

  // fake wallet balance for the client
  ws.wallet = +(Math.random() * (1000 - 10) + 10).toFixed(2);

  ws.send(JSON.stringify({ type: 'SYSTEM', message: 'Connected to WebSocket server' }));
  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);

      if (parsed.type === 'CLIENT_CONNECTED') {
        ws.send(JSON.stringify({
          type: 'INIT',
          wallet: ws.wallet
        }));
        return;
      }

      if (parsed.type === 'PING') {
        ws.send(JSON.stringify({ type: 'PONG' }));
        return;
      }

      if (parsed.type === 'BET') {
        const { move, amount } = parsed;

        if (!move || typeof amount !== 'number') {
          ws.send(JSON.stringify({
            type: 'ERROR',
            message: 'BET requires { move: string, amount: number }'
          }));
          return;
        }

        if (amount > ws.wallet) {
          ws.send(JSON.stringify({ type: 'NO_CREDITS' }));
          return;
        }

        const dealerMove = getRandomRPS();
        const win = determineWin(move, dealerMove);

     
        if (win === true) {
          ws.wallet += amount;
        } else if (win === false) {
          ws.wallet -= amount;
        }

        const response = {
          type: 'BET_RESULT',
          dealerMove,
          playerMove: move,
          win, 
          amount,
          wallet: ws.wallet,
          round: Date.now(),
        };

        ws.send(JSON.stringify(response));
        return;
      }

      ws.send(JSON.stringify({ type: 'ERROR', message: 'Unknown message type' }));
    } catch (err) {
      console.error('❌ Invalid message format:', message);
      ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid JSON format' }));
    }
  });

  ws.on('close', () => {
    console.log('🔌 Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Mock RPS server running on http://localhost:${PORT}`);
});
