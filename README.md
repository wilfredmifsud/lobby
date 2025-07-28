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

Used ChatGPT / Cursor AI for creating the backend MOCK server (was out of scope of this interview, but wanted to more casino oriented software with server instructions), also makes it easier to lift and shift into a different tech stack by abstracting the logic.