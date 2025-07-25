# demorng

This is a mock server for rock-paper-scissors (RPS).

## Usage

- Start the server: `node server.js`
- Endpoint: `GET /round`
- Response:
  ```json
  {
    "dealer": "rock|paper|scissors",
    "player": "rock|paper|scissors"
  }
  ```

## Features
- Returns random RPS results for dealer and player.

## Requirements
- Node.js
- Express
