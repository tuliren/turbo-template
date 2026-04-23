# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

Turborepo monorepo managed with Yarn 4 (Berry) workspaces. Node 20+.

- `apps/web` — Next.js 16 app with Clerk auth, Tailwind v4, Storybook, Jest unit + integration tests.
- `apps/docs` — Nextra docs site (Next.js).
- `apps/chrome` — Manifest V3 Chrome extension (webpack, React, Tailwind v4). See `apps/chrome/README.md` for layout; `build-dev`/`build-prod` output to `apps/chrome/dist` which you load via `chrome://extensions`.
- `apps/backend` — FastAPI (Python, Poetry). Yarn scripts wrap Poetry so top-level `turbo` tasks reach it.
- `packages/database` — Prisma schema, generated client, migration scripts. Exports `@repo/database`.
- `packages/lib` — Shared React components (`@repo/lib`).
- `packages/eslint-config` — Flat-config ESLint presets (`base.js`, `next.js`, `react-internal.js`, `library.js`). ESLint 9.
- `packages/jest-presets` — Jest presets consumed by app/lib jest configs.
- `packages/typescript-config` — Shared tsconfig bases.

## Common commands (run from repo root)

```sh
yarn install              # first time / after lockfile change
yarn dev                  # turbo dev — runs all persistent dev tasks
yarn build                # turbo build
yarn lint                 # turbo lint across all workspaces
yarn typecheck            # turbo typecheck
yarn test                 # turbo test (unit)
yarn integrationTest      # turbo integrationTest (spins up Postgres via Testcontainers)
yarn format:check         # prettier check
yarn format:write         # prettier write
```

Scope a turbo task to one workspace with `--filter`, e.g. `yarn turbo test --filter=@repo/web`. For running a single Jest test inside a workspace, use `yarn --cwd apps/web jest path/to/file.test.ts -t "test name"`.

`apps/backend` uses Poetry under the hood — run `yarn --cwd apps/backend dev:init` once to install Python deps, then `yarn --cwd apps/backend dev` (uvicorn), `test` (pytest), `typecheck` (mypy), `lint` (flake8).

## Architecture notes that aren't obvious from a quick read

- **Turbo task graph** (`turbo.json`): `build` and `dev` both `dependsOn: ["^db:generate"]`, so Prisma client is generated in `packages/database` before dependents build. `integrationTest` also depends on `^db:generate`. Don't bypass this by calling `next build` directly when Prisma types are stale — run the turbo task.
- **ESLint 9 flat config**: the repo has already migrated (see `ESLINT_9_MIGRATION_GUIDE.md`). Configs live in `eslint.config.{js,cjs}` per workspace. `eslint-plugin-import` is replaced by `eslint-plugin-import-x` — don't reintroduce the old plugin.
- **Auth on web**: `apps/web/src/proxy.ts` is the Next.js middleware (renamed from the usual `middleware.ts`) wrapping `clerkMiddleware()`. Protected-route config lives in the `matcher`.
- **Tailwind v4**: `apps/web` and `apps/chrome` use Tailwind v4 with `@tailwindcss/postcss` — no `tailwind.config` content scanning in the old sense; use the v4 conventions.

## Testing conventions

- Unit tests: under `__tests__/` adjacent to the code under test. DB calls must be mocked — unit tests don't touch a real Postgres.
- Integration tests (`apps/web`): under `__integrationTests__/`, run via `jest --config jest.integration.config.cjs`. Setup in `apps/web/jest.integration.setup.ts` boots a `PostgreSqlContainer`, runs `prisma migrate deploy`, and exposes `global.testPrisma`. Import `@tests/integration-tests` for the type declaration.
- `global.testPrisma` does **not** override the Prisma client exported from `@repo/database`. A function under test must accept a Prisma client as an argument if you want the integration test to use the test database. See `ADD_INTEGRATION_TEST_GUIDE.md` for the full pattern when wiring a new app.
- CI (`.github/workflows/ci.yaml`) runs lint, format:check, test, integrationTest, then a separate storybook job. `ubuntu-latest` has Docker pre-installed, so Testcontainers works out of the box.

## Database workflow (`packages/database`)

- Edit `prisma/schema.prisma`, then `yarn --cwd packages/database db:generate` to regenerate the client.
- `db:create-migration` / `db:rollback` / `db:dump-schema` are custom scripts in `packages/database/bin/` — prefer these over raw `prisma migrate` so `schema_dump.sql` stays in sync.
- `db:deploy` runs `prisma migrate deploy` and re-dumps the schema; wired into turbo without cache.

## Scripts (apps/web)

`yarn --cwd apps/web script scripts/<file>.ts -- <args>` runs against `.env.development`; `script:prod` uses `.env.production`. The wrapper (`scripts/runScriptWithEnv.sh`) exports `SCRIPT_ENV`; prod-only scripts should guard on it and exit early in the wrong environment.

## Husky / lint-staged

`postinstall` installs husky hooks. Pre-commit runs `lint-staged`: prettier on JS/TS/JSON/MDX, `prettier-plugin-sql` on SQL, `isort` + `black` on Python. Python formatters need the backend's Poetry env (`yarn --cwd apps/backend dev:init`) or the hook will fail on `.py` changes.

## Dev Preferences

- After each change, run `yarn lint` and `yarn typecheck` to ensure no errors.
- DRY the code when appropriate.
- Always use curly braces after `if` statements.
- Always think about adding unit tests for new features and bug fixes. Aim for good coverage on critical parsing logic and workflows. But skip unit tests if it involves complicated mocking or stubs.
- In unit tests, use `it.each` to group similar test cases together. Do not use "should" in test descriptions.
- When introducing database schema change, reference `packages/database/README.md` for the workflow.
- Never modify any existing migration files.
- When writing Prisma `upsert` statement, always ensure the unique fields have the same values in the `where` and `create` options. This enables Prisma to use native Postgres `upsert` statement.
- When a React component file is long, separate subcomponents into their own component files.
- After making a change, thinking about updating these docs, if applicable:
  - `CLAUDE.md` (this file)
  - `README.md` (in relevant directories)
