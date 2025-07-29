# Rock, Paper, Scissor - Demo Game

This monorepo contains a mock WebSocket backend and a Vite-based React frontend, built with Yarn and managed via Turborepo.

## Requirements

- Node.js version 22.17.1
- Yarn version 1.22 (classic)

## Setup

```bash
nvm install 20
nvm use 20
yarn
```

## Running the App all together (frontend & backend)

```bash
yarn dev
```

This command runs both the frontend and the mock WebSocket server in parallel.

## Structure

```
apps/
├── frontend      # Vite + React frontend
└── backend       # WebSocket backend (mock server)
```

# Tests

I have implemented basic e2e tests to cover the basic functionality to showcase a way of asserting if functionality breaks while refactoring. This can be improved by adding more tests, as well as more jest tests to cover the web socket server and also redux.

To run the tests make sure to open a terminal and run `yarn dev`, opening another new terminal execute `yarn test` which should open a new Chrome instance and test the outcome of the 3 tests I created.

# Notes

Used ChatGPT primarily to build the backend and for styling with Tailwind CSS, as it was faster to iterate for this test project. Additionally, GSAP was included just to experiment with basic animations.

# Assumptions

- No mobile responsiveness was implemented
- Styling and visual polish were not the main focus
