import { useMutation, useQuery } from '@tanstack/react-query'

import { apiClient } from '@/lib/axios'
import type { CreateAccountFormDto } from '@/types/accounts/forms/CreateAccountFormDto'
import type { CreateAccountResponseDto } from '@/types/accounts/responses/CreateAccountResponseDto'
import type { DeleteAccountResponseDto } from '@/types/accounts/responses/DeleteAccountResponseDto'
import type { GetAccountsResponseDto } from '@/types/accounts/responses/GetAccountsResponseDto'

import { queryKeys } from '../QueryKeys'

const basePath = '/accounts'

export function useGetAccounts() {
  return useQuery({
    queryKey: queryKeys.accounts.all,
    queryFn: async ({ signal }) => {
      const response = await apiClient.get<GetAccountsResponseDto[]>(basePath, { signal })
      return response.data
    },
  })
}

export function useCreateAccount() {
  return useMutation({
    mutationFn: async (data: CreateAccountFormDto) => {
      const response = await apiClient.post<CreateAccountResponseDto>(basePath, data)
      return response.data
    },
    onSuccess: (_, __, ___, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.accounts.all })
    },
  })
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<DeleteAccountResponseDto>(`${basePath}/${id}`)
      return response.data
    },
    onSuccess: (_, __, ___, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.accounts.all })
    },
  })
}
