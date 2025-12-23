import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthStore = {
  authToken: string | null
  refreshToken: string | null
  actions: {
    setAuthTokens: (authToken: string, refreshToken: string) => void
    clearAuth: () => void
  }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authToken: null,
      refreshToken: null,
      actions: {
        setAuthTokens: (authToken: string, refreshToken: string) => {
          set({
            authToken,
            refreshToken,
          })
        },
        clearAuth: () => {
          set({
            authToken: null,
            refreshToken: null,
          })
        },
      },
    }),
    {
      name: 'budget-auth-storage',
    }
  )
)
