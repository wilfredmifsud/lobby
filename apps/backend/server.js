const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

const BET_AMOUNT = 500;
const STARTING_WALLET_AMOUNT = 5000;

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

function validateBets(bets, wallet) {
  if (!Array.isArray(bets) || bets.length === 0 || bets.length > 2) {
    return { valid: false, message: 'You must bet on 1 or 2 positions only.' };
  }
  const totalBet = bets.length * BET_AMOUNT;
  if (totalBet > wallet) {
    return { valid: false, message: 'Not enough balance for these bets.' };
  }
  const uniqueMoves = new Set(bets.map(b => b.move));
  if (uniqueMoves.size !== bets.length) {
    return { valid: false, message: 'Duplicate positions are not allowed.' };
  }
  if (uniqueMoves.size > 2) {
    return { valid: false, message: 'Cannot bet on more than 2 positions.' };
  }
  return { valid: true };
}

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // fake wallet balance for the client
  ws.wallet = STARTING_WALLET_AMOUNT;

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
        const { bets } = parsed;
        const validation = validateBets(bets, ws.wallet);
        if (!validation.valid) {
          ws.send(JSON.stringify({
            type: 'ERROR',
            message: validation.message
          }));
          return;
        }
        // Deduct bets from wallet first
        const totalBet = bets.length * 500;
        ws.wallet -= totalBet;
        const dealerMove = getRandomRPS();
        let payout = 0;
        let results = bets.map((bet, idx) => {
          const win = determineWin(bet.move, dealerMove);
          let result = 'lose';
          let returned = 0;
          if (win === true) {
            result = 'win';
            if (bets.length === 1) {
              returned = 500 * 14;
            } else if (bets.length === 2) {
              returned = 500 * 3;
            }
            payout += returned;
          } else if (win === null) {
            result = 'tie';
            returned = 500; // tie returns bet
            payout += returned;
          }
          return {
            move: bet.move,
            amount: 500,
            result,
            returned
          };
        });
        ws.wallet += payout;
        const response = {
          type: 'BET_RESULT',
          dealerMove,
          bets: results,
          wallet: ws.wallet,
          round: Date.now(),
        };
        ws.send(JSON.stringify(response));
        return;
      }

      ws.send(JSON.stringify({ type: 'ERROR', message: 'Unknown message type' }));
    } catch (err) {
      console.error('Invalid message format:', message);
      ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid JSON format' }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
