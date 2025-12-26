import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { getTokenExpiration, isTokenExpired } from '@/lib/utils'

type Token = {
  token: string
  expireAt: Date
}

type AuthStore = {
  authToken: Token | null
  refreshToken: Token | null
  actions: {
    setAuthTokens: (authToken: string, refreshToken: string) => void
    isAuthTokenValid: () => boolean
    isRefreshTokenValid: () => boolean
    clearAuth: () => void
  }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
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
        isAuthTokenValid: () => !isTokenExpired(get().authToken?.token ?? null),
        isRefreshTokenValid: () => !isTokenExpired(get().refreshToken?.token ?? null),
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
