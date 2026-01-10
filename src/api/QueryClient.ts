import type { Problem } from '@/types/Problem'

declare module '@tanstack/react-query' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    // Use unknown so call sites must narrow explicitly.
    defaultError: Problem
  }
}
