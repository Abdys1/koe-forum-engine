# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KOE Forum Engine — a full-stack forum/RPG character management application with a Node.js/Express backend and Next.js frontend.

## Commands

### Backend (`/backend`)

```bash
npm run dev              # Start development server (port 4000)
npm run watch:dev        # Start with file watching
npm run build            # Compile TypeScript (tsc + tsc-alias for path resolution)
npm run lint             # ESLint

npm run test:unit        # Run unit tests
npm run test:integ       # Run integration tests (sequential, requires Docker)

npm run migrate:dev      # Apply Prisma migrations (dev)
npm run migrate:test     # Apply Prisma migrations (test DB)
npm run seed:dev         # Seed the development database
```

**Important:** Vitest runs in watch mode by default and never exits. Always use `--run` when running tests non-interactively (e.g. as an AI agent):
```bash
npx dotenv -e .env.test -- vitest --project unit --run
npx dotenv -e .env.test -- vitest --project integration --no-file-parallelism --run
```

To run a single test file:
```bash
npx dotenv -e .env.test -- vitest --project unit --run path/to/file.unit.test.ts
npx dotenv -e .env.test -- vitest --project integration --no-file-parallelism --run path/to/file.integration.test.ts
```

### Frontend (`/frontend`)

```bash
npm run dev    # Start Next.js dev server (port 3000)
npm run build  # Production build
npm run lint   # ESLint
```

## Architecture

### Backend

Clean architecture with component-based feature modules. Request flow:

```
HTTP Request → app.ts middleware → routes/api.routes.ts → Component Controller → Use Case → Repository → Prisma → PostgreSQL
```

Each feature in `src/components/` follows the same structure: controller → use-case(s) → repository. Current components: `auth`, `character`, `equipment`, `storage`, `user`, `logger`, `routerconf`.

**Key files:**
- `src/bin/www.ts` — entry point
- `src/app.ts` — Express app setup and middleware registration
- `src/config.ts` — environment config loader
- `src/types.ts` — shared TypeScript types
- `src/routes/api.routes.ts` — all API routes (`/api/auth`, `/api/characters`, `/api/equipment`)
- `prisma/schema.prisma` — DB schema (ForumUser, Character, Equipment, EquipmentType, and a configurable `Slot` per equipment type capping how many of that type — weighted by each equipment's `slotCost` — a character can equip)

**Storage** is pluggable via a factory pattern — `STORAGE_TYPE=local` or `STORAGE_TYPE=s3`.

**Authentication** uses JWT (access + refresh tokens). The auth middleware (`src/middlewares/auth.middleware.ts`) verifies Bearer tokens and attaches the user to the request.

**Path aliases:** `@src/*` → `src/`, `@test/*` → `__tests__/`

### Backend Tests

Two Vitest projects defined in `vitest.workspace.ts`:
- **unit** — matches `*.unit.test.ts`, no external dependencies
- **integration** — matches `*.integration.test.ts`, runs sequentially, spins up a PostgreSQL 16.4 container via TestContainers (Docker required) on port 5433

Test helpers are in `__tests__/utils/` and API test clients in `__tests__/clients/`.

### Frontend

Next.js 14 App Router. Authentication via NextAuth.js with a Credentials provider that talks to the backend `/api/auth` endpoints. Tokens from the backend are stored in the NextAuth session and injected as Bearer tokens on outbound API requests.

**Key files:**
- `src/app/api/auth/[...nextauth]/` — NextAuth configuration
- `src/lib/api/` — HTTP client and auth API client
- `src/middleware.ts` — route protection via NextAuth

## Environment

Backend dev uses `.env`, tests use `.env.test`. Frontend uses `.env.local`. The test database runs on port 5433 (separate from the dev database on 5432).

## Workflow

After every code change, run the unit tests to verify nothing is broken:
```bash
npx dotenv -e .env.test -- vitest --project unit --run
```

## Code Style

- ESLint enforces **sorted imports** (`simple-import-sort`) — run `npm run lint` to catch violations.
- Prettier is integrated with ESLint; uses default Prettier settings.
- TypeScript strict mode is enabled.
- Do not add code comments unless the developer explicitly asks for them.
