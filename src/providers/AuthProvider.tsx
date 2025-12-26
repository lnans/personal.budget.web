import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
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
