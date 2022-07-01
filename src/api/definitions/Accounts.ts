import { http } from '@api'
import { AccountInfoResponse, CreateAccountRequest, UpdateAccountRequest } from '@models'

const ACCOUNT_CACHE_KEY = 'accounts'

const getAccounts =
  ({ archived = false }) =>
  () =>
    http.Get<AccountInfoResponse[]>(`/accounts?archived=${archived}`)

const postAccount = (form: CreateAccountRequest) => http.Post('/accounts', form)

const updateAccount = (id: string) => (form: UpdateAccountRequest) => http.Patch(`/accounts/${id}`, form)

const archiveAccount = (id: string, archived: boolean) => () => http.Patch(`/accounts/${id}/archive`, { archived })

const deleteAccount = (id: string) => () => http.Delete(`/accounts/${id}`)

export const accountsRequests = {
  ACCOUNT_CACHE_KEY,
  archiveAccount,
  deleteAccount,
  getAccounts,
  postAccount,
  updateAccount,
}
