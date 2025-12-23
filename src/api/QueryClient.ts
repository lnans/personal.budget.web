import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
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
    },
  },
})
