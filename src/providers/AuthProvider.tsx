import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRefreshToken } from '@/api/commands/AuthenticationCommands'
import { AuthFn } from '@/api/endpoints/AuthenticationEndpoints'
import { queryKeys } from '@/api/QueryKeys'
import { AppLoader } from '@/components/ui/AppLoader'
import { useAuthStore } from '@/features/authentication/stores/authStore'

const REFRESH_TOKEN_BEFORE_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes

function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  const { authToken, refreshToken } = useAuthStore((state) => state)
  const { isAuthTokenValid, isRefreshTokenValid, clearAuth } = useAuthStore((state) => state.actions)

  const isAuthValid = authToken && isAuthTokenValid()
  const isRefreshValid = refreshToken && isRefreshTokenValid()
  const hasNoTokens = !authToken && !refreshToken

  const { mutate: refreshTokenMutate, isPending: isRefreshingToken } = useRefreshToken()

  const {
    data: currentUser,
    isLoading: isLoadingUser,
    isError: isUserError,
  } = useQuery({
    queryKey: queryKeys.auth.all,
    queryFn: AuthFn.getCurrentUser,
    enabled: isAuthValid === true,
    retry: false,
  })

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
      refreshTimerRef.current = null
    }
  }, [])

  const scheduleTokenRefresh = useCallback(() => {
    const authValid = authToken && isAuthTokenValid()
    const refreshValid = refreshToken && isRefreshTokenValid()

    if (!authValid || !authToken?.expireAt || !refreshValid) {
      return
    }

    const expirationTime = new Date(authToken.expireAt).getTime()
    const now = Date.now()
    const timeUntilRefresh = expirationTime - now - REFRESH_TOKEN_BEFORE_EXPIRY_MS

    if (timeUntilRefresh > 0) {
      refreshTimerRef.current = setTimeout(() => {
        refreshTokenMutate(refreshToken.token)
      }, timeUntilRefresh)
    } else {
      refreshTokenMutate(refreshToken.token)
    }
  }, [authToken, refreshToken, isAuthTokenValid, isRefreshTokenValid, refreshTokenMutate])

  useEffect(() => {
    if (hasNoTokens) {
      navigate('/auth', { replace: true })
      return
    }

    if (isAuthValid) {
      return
    }

    if (isRefreshValid) {
      refreshTokenMutate(refreshToken.token)
      return
    }

    clearAuth()
    navigate('/auth', { replace: true })
  }, [hasNoTokens, isAuthValid, isRefreshValid, navigate, refreshTokenMutate, refreshToken, clearAuth])

  useEffect(() => {
    clearRefreshTimer()
    scheduleTokenRefresh()

    return clearRefreshTimer
  }, [clearRefreshTimer, scheduleTokenRefresh])

  const isLoading = isRefreshingToken || (isAuthValid && isLoadingUser)

  if (isLoading) {
    return <AppLoader />
  }

  if (isUserError) {
    clearAuth()
    navigate('/auth', { replace: true })
    return null
  }

  if (isAuthValid && currentUser) {
    return <>{children}</>
  }

  return null
}

export default AuthProvider
