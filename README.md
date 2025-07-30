# Rock, Paper, Scissor - Demo Game

This monorepo contains a mock WebSocket based backend server and a Vite-based React frontend.

Demo URL: [https://lobby-pi.vercel.app](https://lobby-pi.vercel.app)

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

Used a WebSocket backend to mock the casino server – keeps the source of truth outside the frontend and avoids messy random logic in components.

Added Redux – pulls state and logic out of components so they stay clean and focused.

Built small, single-responsability components which easy to swap out or refactor since each one only does one job.

Styling done with Tailwind – lightweight, framework-agnostic, no heavy coupling.

# Assumptions

- No mobile responsiveness was implemented
- Styling and visual polish were not the main focus
