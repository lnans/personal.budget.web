import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import type { Problem } from '@/types/Problem'

function QueryProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()

  /**
   * Global error handler for react-query
   */
  const onError = useCallback(
    (error: Problem) => {
      console.error('React Query Error:', error)
      if (error.status === 401) {
        toast.error(t('errors.User.InvalidCredentials'))
      }
      if (error.status === 403) {
        toast.error(t('errors.User.Forbidden'))
      }
      if (error.status === 500) {
        toast.error(t('errors.User.InternalServerError'))
      }
    },
    [t]
  )

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // Stale time: data is considered fresh for 5 minutes
          staleTime: 1000 * 60 * 5,
          // Cache time: unused data stays in cache for 10 minutes
          gcTime: 1000 * 60 * 10,
          retry: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
        },
        mutations: {
          retry: false,
          throwOnError: false,
        },
      },
      queryCache: new QueryCache({ onError }),
      mutationCache: new MutationCache({ onError }),
    })
  }, [onError])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
