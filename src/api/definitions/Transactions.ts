import { http } from '@api'
import { InfiniteData, TransactionInfoResponse } from '@models'

const TRANSACTIONS_CACHE_KEY = 'transactions'

const getTransactions =
  ({ accountId = '' }) =>
  () =>
    http.Get<InfiniteData<TransactionInfoResponse>>(`/transactions?accountId=${accountId}`)

export const transactionsRequests = {
  TRANSACTIONS_CACHE_KEY,
  getTransactions,
}
