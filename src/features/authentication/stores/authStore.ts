import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { getTokenExpiration } from '@/lib/utils'

type Token = {
  token: string
  expireAt: Date
}

type AuthStore = {
  authToken: Token | null
  refreshToken: Token | null
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
            authToken: {
              token: authToken,
              expireAt: getTokenExpiration(authToken)!,
            },
            refreshToken: {
              token: refreshToken,
              expireAt: getTokenExpiration(refreshToken)!,
            },
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
      partialize: (state) => ({
        authToken: state.authToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
)
