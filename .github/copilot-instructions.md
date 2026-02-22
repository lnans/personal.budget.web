# Copilot instructions (personal.budget.web)

## Quick start / workflows

- Package manager is **Yarn 4 (Corepack)**. Common commands:
  - `yarn dev` (Vite dev server)
  - `yarn build` (TypeScript build + Vite build)
  - `yarn validate` (runs `lint:fix`, `type:check`, `format`)
- Backend base URL is required: set `VITE_API_URL` (validated by `src/types/EnvSchema.ts`).
- `yarn format` runs Prettier **and** formats i18n keys via `plugins/i18n-format.ts` (rewrites `public/locales/en.json`).
- Docker workflow (optional): `docker-compose up --build` serves the app at `http://localhost:8081`.

## Big picture architecture

- Vite + React 19 + TypeScript. Path alias `@` → `src` (see `vite.config.ts`). Prefer `@/…` imports.
- Routing is defined in `src/providers/RouterProvider.tsx` using React Router nested routes and `lazyImport(…, <AppLoader />)`.
  - Protected routes go under the `ProtectedLayout` wrapper (uses `src/providers/AuthProvider.tsx`).
- App bootstrapping is in `src/main.tsx`: `QueryProvider` → `I18nextProvider` → router, plus Sonner `Toaster`.

## API / data flow conventions

- HTTP client is `apiClient` in `src/config/axios.ts`:
  - Injects `Authorization: Bearer …` from the Zustand auth store.
  - Normalizes errors by rejecting with a backend `Problem` payload or a fallback `Problem` (network error).
- Server-state is handled with TanStack Query hooks located in `src/api/endpoints/*.ts`.
  - Keep query keys centralized in `src/api/QueryKeys.ts`.
  - Global query/mutation error handling is in `src/providers/QueryProvider.tsx` (toasts + i18n).

## Auth conventions

- Auth state lives in `src/features/authentication/stores/authStore.ts` (Zustand + `persist`). Storage key: `budget-auth-storage`.
- Token refresh scheduling and “redirect to /auth on invalid tokens” behavior is handled in `src/providers/AuthProvider.tsx`.

## Types / DTOs (domain-driven)

- Environment variables are validated with Zod:
  - Add/modify env vars in `src/types/EnvSchema.ts`.
  - Read validated values from `ENV` in `src/env.ts`.
- Domain types live in `src/types/<domain>/…` (see `conventions in this section`):
  - File naming: `<domain>Errors.ts`, `enums/*Type.ts`, `forms/*FormDto.ts`, `responses/*ResponseDto.ts`.
  - `forms/*FormDto.ts`: Zod schema (`*Schema`) + inferred type (`*FormDto`).
    - Keep validation constants (e.g. `MAX_NAME_LENGTH`) at the top of the file.
    - Import enum schemas via alias paths (e.g. `@/types/accounts/enums/AccountType`).
  - `responses/*.ts`: plain TypeScript types (use `import type`).
    - Import enum **types** (not schemas) in responses.
  - `enums/*Type.ts`: use `z.enum(...)` and export both `{Name}Schema` and `{Name}` type.
  - `<domain>Errors.ts`: `as const` error codes; these are typically translated via keys like `errors.<Code>`.
  - Create an `enums/` folder only for domains that actually define enums.
  - Prefer alias imports (`@/…`) over relative imports for cross-domain type usage.

## UI, forms, i18n

- Prefer existing primitives in `src/components/ui/*` (Radix-based) and utilities like `cn()` in `src/lib/utils.ts`.
- Forms use React Hook Form + Zod and the controlled wrappers in `src/components/forms/*Controlled.tsx` (integrates `FieldLabel`, `FieldError`, and `useTranslation()`).
- Translations are loaded from `public/locales/{{lng}}.json` (configured in `src/config/I18next.ts`).

## Linting conventions that will fail CI

- ESLint enforces `import/order` and sorted JSX props (`react/jsx-sort-props`) (see `eslint.config.js`).

## Commit message conventions

- Follow the existing **Conventional Commits** style used in history: `type(scope): short imperative summary`.
- Common types in this repo: `feat`, `fix`, `refactor`, `chore`.
- Use a focused scope matching the touched area (`auth`, `accounts`, `ui`, `api`, `deps`, `eslint`, `docker`, `docs`, `copilot`, `scripts`, `router`, `main`, `packages`).
- Keep subject lines concise and action-oriented (what changed, not why in detail).
- Prefer one logical change per commit; split unrelated edits into separate commits.
- Avoid `wip` commits on shared branches.
- Examples from this repository style:
  - `feat(auth): add avatar sidebar menu item`
  - `chore(deps): update package dependencies to latest versions`
  - `refactor(router): restructure application routing by introducing AppRouter`
