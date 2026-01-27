import { useMutation } from '@tanstack/react-query'

import { AccountsFn } from '../endpoints/AccountsEndpoints'
import { queryKeys } from '../QueryKeys'

export function useCreateAccount() {
  return useMutation({
    mutationFn: AccountsFn.createAccount,
    onSuccess: (_, __, ___, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.accounts.all })
    },
  })
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: AccountsFn.deleteAccount,
    onSuccess: (_, __, ___, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.accounts.all })
    },
  })
}
