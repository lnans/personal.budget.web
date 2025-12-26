import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthFn } from '@/api/endpoints/AuthenticationEndpoints'
import { queryKeys } from '@/api/QueryKeys'
import { useAuthStore } from '@/features/authentication/stores/authStore'

function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { authToken, refreshToken } = useAuthStore((state) => state)
  const { isAuthTokenValid, isRefreshTokenValid, setAuthTokens, clearAuth } = useAuthStore((state) => state.actions)

  const isAuthValid = authToken && isAuthTokenValid()
  const isRefreshValid = refreshToken && isRefreshTokenValid()

  const { mutate: refreshTokenMutate, isPending: isRefreshingToken } = useMutation({
    mutationFn: () => AuthFn.refreshToken(refreshToken!.token),
    onSuccess: (data) => {
      setAuthTokens(data.bearer, data.refreshToken)
    },
    onError: () => {
      clearAuth()
      navigate('/auth', { replace: true })
    },
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

  useEffect(() => {
    if (!authToken && !refreshToken) {
      navigate('/auth', { replace: true })
      return
    }

    if (isAuthValid) {
      return
    }

    if (!isAuthValid && isRefreshValid) {
      refreshTokenMutate()
      return
    }

    if (!isAuthValid && !isRefreshValid) {
      clearAuth()
      navigate('/auth', { replace: true })
    }
  }, [authToken, refreshToken, isAuthValid, isRefreshValid, navigate, refreshTokenMutate, clearAuth])

  useEffect(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
      refreshTimerRef.current = null
    }

    if (isAuthValid && authToken?.expireAt && isRefreshValid) {
      const expirationTime = new Date(authToken.expireAt).getTime()
      const now = Date.now()
      const fiveMinutesInMs = 5 * 60 * 1000
      const timeUntilRefresh = expirationTime - now - fiveMinutesInMs

      if (timeUntilRefresh > 0) {
        refreshTimerRef.current = setTimeout(() => {
          refreshTokenMutate()
        }, timeUntilRefresh)
      } else {
        refreshTokenMutate()
      }
    }

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
        refreshTimerRef.current = null
      }
    }
  }, [isAuthValid, isRefreshValid, authToken?.expireAt, refreshTokenMutate])

  if (isRefreshingToken || (isAuthValid && isLoadingUser)) {
    return <div>Loading...</div>
  }

  if (isUserError) {
    clearAuth()
    navigate('/auth', { replace: true })
    return null
  }

  if (isAuthValid && currentUser) {
    return <>{children}</>
  }

  // Default: show nothing while redirecting
  return null
}

export default AuthProvider
