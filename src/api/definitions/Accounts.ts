import { AccountInfoResponse, CreateAccountRequest, UpdateAccountRequest } from '@models'

import { Delete, Get, Patch, Post } from '../utils'

const ACCOUNT_CACHE_KEY = 'accounts'

const getAccounts =
  ({ archived = false }) =>
  () =>
    Get<AccountInfoResponse[]>(`/accounts?archived=${archived}`)

const postAccount = (form: CreateAccountRequest) => Post('/accounts', form)

const updateAccount = (id: string) => (form: UpdateAccountRequest) => Patch(`/accounts/${id}`, form)

const archiveAccount = (id: string, archived: boolean) => () =>
  Patch(`/accounts/${id}/archive`, { archived })

const deleteAccount = (id: string) => () => Delete(`/accounts/${id}`)

export const accountsRequests = {
  ACCOUNT_CACHE_KEY,
  archiveAccount,
  deleteAccount,
  getAccounts,
  postAccount,
  updateAccount,
}
