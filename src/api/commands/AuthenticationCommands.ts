import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/features/authentication/stores/authStore'

import { AuthFn } from '../endpoints/AuthenticationEndpoints'

export function useSignIn() {
  const { setAuthTokens, clearAuth } = useAuthStore((state) => state.actions)
  return useMutation({
    mutationFn: AuthFn.signIn,
    onSuccess: (data) => {
      setAuthTokens(data.bearer, data.refreshToken)
    },
    onError: () => {
      clearAuth()
    },
  })
}

export function useRefreshToken() {
  const navigate = useNavigate()
  const { setAuthTokens, clearAuth } = useAuthStore((state) => state.actions)

  const redirectToAuth = useCallback(() => {
    clearAuth()
    navigate('/auth', { replace: true })
  }, [clearAuth, navigate])

  return useMutation({
    mutationFn: AuthFn.refreshToken,
    onSuccess: (data) => {
      setAuthTokens(data.bearer, data.refreshToken)
    },
    onError: redirectToAuth,
  })
}
