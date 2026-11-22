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
npm run dev              # Start Next.js dev server (port 3000)
npm run build            # Production build
npm run lint             # ESLint (incl. sorted imports and atomic design boundaries)
npm run test:unit        # Run unit tests once (Vitest, `*.unit.test.ts(x)`)
npm run storybook        # Start Storybook (port 6006)
npm run build-storybook  # Static Storybook build
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
- `src/container.ts` — Awilix container (`buildContainer`), combines the `*.module.ts` registrations
- `src/routes/api.routes.ts` — all API routes (`/api/auth`, `/api/characters`, `/api/equipment`)
- `prisma/schema.prisma` — DB schema (ForumUser, Character, Equipment, EquipmentType, and a configurable `Slot` per equipment type capping how many of that type — weighted by each equipment's `slotCost` — a character can equip)

**Dependency injection** uses Awilix (`src/container.ts`, `InjectionMode.CLASSIC`, `strict: true`). Each component registers its repositories, use cases and controller in its own `<component>.module.ts`, a plain object of registrations, mostly `asClass(Impl).singleton()`; the `Cradle` type is derived from these objects in `container.ts`, so there are no hand-written cradle interfaces. CLASSIC mode injects by **constructor parameter name**, so a constructor parameter must be named exactly like the registration it needs (e.g. `slotRepositories`, `characterEquipmentValidation`); renaming one breaks resolution at runtime, which `__tests__/container.unit.test.ts` (resolves every registration) catches. Factories written with `asFunction` that destructure the cradle must be marked `.proxy()`, and must type their parameter with only the dependencies they need (e.g. `({ db }: { db: DbClient })`), never with `Cradle` — that creates a circular type reference. Implementation classes keep plain constructor injection and never import the container. Route files export a function returning a plain `RouterConfig[]` built from what they need from the cradle (`xRoutes({ xController })`); `createApiRouter` builds `defineRouter` with the auth middleware (not part of the container) and applies it to each list (`defineRouter(xRoutes(cradle))`), and `createApp(container)` / `buildContainer(overrides?)` are called from `src/bin/www.ts`. No module-level singletons: the `PrismaClient` is created by the container (`createDbClient`). Integration tests share one `testContainer` from `__tests__/utils/test-container.ts`, which also re-exports the dependencies tests use directly (`db`, `transactionManager`, `userDao`, repository providers); import them from there instead of reading `testContainer.cradle`, and add a new one to that export list when a test needs it. Repository providers are registered with the `repositoryProvider(factory)` helper from `transaction.module.ts`; `transactionManager` must stay a single instance (nested-transaction detection is per instance).

**Storage** is the `storageService` registration (`src/components/storage/storage.module.ts`): `LocalStorageService` (directory from `LOCAL_UPLOADS_DIR`, default `.data/uploads`, loaded into `config.storage.local.uploadsDir`) or `S3StorageService`, selected by `STORAGE_TYPE=local` or `STORAGE_TYPE=aws`. Uploads are parsed into memory by `createImageUploadMiddleware` (multer), validated with express-validator, and only stored by the use case once validation passed; the use case deletes the stored file if the DB write fails. Integration tests override `storageService` with a `LocalStorageService` writing to a temp dir (`uploadsDir` from `test-container.ts`).

**Authentication** uses JWT (access + refresh tokens). The auth middleware (`src/middlewares/auth.middleware.ts`) verifies Bearer tokens and attaches the user to the request.

**Transactions** (`src/components/transaction/`): use cases receive repositories as `RepositoryProvider<R>`. `get()` returns the repository bound to the global client; inside `transactionManager.execute(async (tx) => ...)` use `inTransaction(tx)` to get the transaction-bound one. Returning `rollback(result)` from the callback rolls the transaction back and makes `execute` return `result`; a thrown error also rolls back and propagates. Rules:
- A transaction callback may only contain repository calls (via `inTransaction(tx)`) and pure functions that do not touch the database — never another use case. A use case called inside the callback would silently run outside the transaction, because it reads its repositories with `get()`.
- Business logic needed inside a transaction is split into data loading (repository method) and decision logic (pure function); the transaction-opening use case loads the data with the transaction-bound repository and calls the pure function.
- Only the use case that opens the transaction calls `transactionManager.execute`; there are no nested transactions. Calling `execute` inside a running transaction throws `NestedTransactionError` (and rolls back the outer one), because Prisma would otherwise open an independent transaction on a separate connection.

**Path aliases:** `@src/*` → `src/`, `@test/*` → `__tests__/`

### Backend Tests

Two Vitest projects defined in `vitest.workspace.ts`:
- **unit** — matches `*.unit.test.ts`, no external dependencies
- **integration** — matches `*.integration.test.ts`, runs sequentially, spins up a PostgreSQL 16.4 container via TestContainers (Docker required) on port 5433

Test helpers are in `__tests__/utils/` and API test clients in `__tests__/clients/`.

### Frontend

Next.js 14 App Router. Authentication via NextAuth.js with a Credentials provider that talks to the backend `/api/auth` endpoints. Tokens from the backend are stored in the NextAuth session and injected as Bearer tokens on outbound API requests.

**Key files:**
- `src/lib/auth/auth.ts` — NextAuth configuration (`config`, `auth()`); the route handler stays in `src/app/api/auth/[...nextauth]/route.ts`
- `src/lib/api/` — HTTP client and auth API client
- `src/middleware.ts` — route protection via NextAuth

**Atomic design** (refactor in progress; the legacy `src/components/<Name>/` folders are being migrated level by level). Target layout:
- `src/components/atoms/<Name>/`, `molecules/<Name>/`, `organisms/<domain>/<Name>/`, `templates/<Name>/` — presentation only; each folder holds `<Name>.tsx`, `<Name>.css.ts` and `<Name>.stories.tsx`.
- `src/features/<domain>/` — business logic without markup: `model/` (types, pure functions), `hooks/`, `actions/` (server actions), `queries/` (server-side data loading).
- `src/lib/` — infrastructure: API clients, auth config. `src/utils/` — dependency-free generic helpers (e.g. `dateFormat`), usable from every level. `src/hooks/` — generic UI hooks. `src/styles/` — tokens and global styles.
- `src/app/` — routing only: pages load data via `features/*/queries` and render a template.

Material icons are always rendered with the `Icon` atom, never with a hand-written `material-icons` span. Styles use tokens from `src/styles/tokens.ts` (colors, `withAlpha`, `layout` sizes such as `layout.headerTotalHeight`) instead of raw color values; `src/styles/shared.css.ts` holds only generic surfaces and typography, never feature-specific styles, and style files never import from components.

The levels are enforced by `boundaries/dependencies` in `frontend/.eslintrc.json`: a level only imports lower levels; atoms and molecules are domain-agnostic (no `features`, `lib`, dummy data or server actions); organisms may use `features` and only *type* imports from `lib`; features never import components; lib only imports lib. Files outside the classified folders are not checked yet.

### Frontend Tests

Vitest (`frontend/vitest.config.mts`), unit tests only, co-located as `*.unit.test.ts(x)`. Business logic is tested through pure functions in `features/*/model` (shared fixtures in `__fixtures__/`); server actions and queries stay thin wrappers around them. Server actions only export async functions, so their result types and constants live in the model. Every new atom, molecule and organism gets a Storybook story.

## Environment

Backend dev uses `.env`, tests use `.env.test`. Frontend uses `.env.local`. The test database runs on port 5433 (separate from the dev database on 5432).

## Workflow

After every code change, run the unit tests to verify nothing is broken:
```bash
npx dotenv -e .env.test -- vitest --project unit --run   # backend
npm run test:unit && npm run lint                          # frontend
```

## Code Style

- ESLint enforces **sorted imports** (`simple-import-sort`) — run `npm run lint` to catch violations.
- Prettier is integrated with ESLint; uses default Prettier settings.
- TypeScript strict mode is enabled.
- Do not add code comments unless the developer explicitly asks for them.
