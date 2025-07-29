# Rock, Paper, Scissor - Fun Game

This monorepo contains a mock WebSocket backend and a Vite-based React frontend, built with Yarn and managed via Turborepo.

## Requirements

- Node.js version 22.17.1
- Yarn version 1.22 (classic)

## Setup

```bash
nvm install 22.17.1
nvm use 22.17.1
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

# Notes
Used ChatGPT primarily to build the backend and for styling with Tailwind CSS, as it was faster to iterate for this test project. Additionally, GSAP was included just to experiment with basic animations.

# Assumptions
- No mobile responsiveness was implemented
- Styling and visual polish were not the main focus