# demogame

This monorepo contains a mock WebSocket backend and a Vite-based React frontend, built with Yarn and managed via Turborepo.

## Requirements

- Node.js v20 (use `nvm`)
- Yarn 1.22 (classic)

## Setup

```bash
nvm install 20
nvm use 20
yarn
```

## Running the App all together

```bash
yarn dev
```

This command runs both the frontend and the mock WebSocket server in parallel.

## Structure

```
apps/
├── frontend      # Vite + React frontend
└── demorng       # WebSocket backend (mock server)
```

# Notes

1. Used ChatGPT / Cursor AI for
   a. creating the backend MOCK server (was out of scope of this interview, but wanted to more casino oriented software with server instructions)
   b. GSAP animations (its a new library for me, but was fun learning how it works)
   c. some generic use to create basic functionality which was verified manually
