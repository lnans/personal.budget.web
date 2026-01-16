import { queryOptions } from '@tanstack/react-query'

import { apiClient } from '@/lib/axios'
import type { CreateAccountFormDto } from '@/types/accounts/forms/CreateAccountFormDto'
import type { CreateAccountResponseDto } from '@/types/accounts/responses/CreateAccountResponseDto'
import type { GetAccountsResponseDto } from '@/types/accounts/responses/GetAccountsResponseDto'

import { queryKeys } from '../QueryKeys'

const group = 'accounts'

export const AccountsFn = {
  getAccounts: async () => {
    const response = await apiClient.get<GetAccountsResponseDto[]>(`/${group}`)
    return response.data
  },
  createAccount: async (data: CreateAccountFormDto) => {
    const response = await apiClient.post<CreateAccountResponseDto>(`/${group}`, data)
    return response.data
  },
} as const

export const AccountsQueryOptions = {
  getAccounts: () =>
    queryOptions({
      queryKey: queryKeys.accounts.all,
      queryFn: AccountsFn.getAccounts,
    }),
} as const
