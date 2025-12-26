import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthFn } from '@/api/endpoints/AuthenticationEndpoints'
import { queryKeys } from '@/api/QueryKeys'
import { useAuthStore } from '@/features/authentication/stores/authStore'

const REFRESH_TOKEN_BEFORE_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes

function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  const { authToken, refreshToken } = useAuthStore((state) => state)
  const { isAuthTokenValid, isRefreshTokenValid, setAuthTokens, clearAuth } = useAuthStore((state) => state.actions)

  const isAuthValid = authToken && isAuthTokenValid()
  const isRefreshValid = refreshToken && isRefreshTokenValid()
  const hasNoTokens = !authToken && !refreshToken

  const redirectToAuth = useCallback(() => {
    clearAuth()
    navigate('/auth', { replace: true })
  }, [clearAuth, navigate])

  const { mutate: refreshTokenMutate, isPending: isRefreshingToken } = useMutation({
    mutationFn: () => AuthFn.refreshToken(refreshToken!.token),
    onSuccess: (data) => {
      setAuthTokens(data.bearer, data.refreshToken)
    },
    onError: redirectToAuth,
  })

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
        refreshTokenMutate()
      }, timeUntilRefresh)
    } else {
      refreshTokenMutate()
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
      refreshTokenMutate()
      return
    }

    redirectToAuth()
  }, [hasNoTokens, isAuthValid, isRefreshValid, navigate, refreshTokenMutate, redirectToAuth])

  useEffect(() => {
    clearRefreshTimer()
    scheduleTokenRefresh()

    return clearRefreshTimer
  }, [clearRefreshTimer, scheduleTokenRefresh])

  const isLoading = isRefreshingToken || (isAuthValid && isLoadingUser)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isUserError) {
    redirectToAuth()
    return null
  }

  if (isAuthValid && currentUser) {
    return <>{children}</>
  }

  return null
}

export default AuthProvider
