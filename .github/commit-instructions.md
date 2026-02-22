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
