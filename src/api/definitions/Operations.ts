import { http } from '@api'
import { InfiniteData, OperationInfoResponse } from '@models'

const OPERATIONS_CACHE_KEY = 'operations'

const getOperations =
  ({ accountId = '' }) =>
  () =>
    http.Get<InfiniteData<OperationInfoResponse>>(`/operations?accountId=${accountId}`)

export const operationsRequests = {
  OPERATIONS_CACHE_KEY,
  getOperations,
}
