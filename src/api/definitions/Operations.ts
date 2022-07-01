import { InfiniteData, OperationInfoResponse } from '@models'

import { Get } from '../utils'

const OPERATIONS_CACHE_KEY = 'operations'

const getOperations =
  ({ accountId = '' }) =>
  () =>
    Get<InfiniteData<OperationInfoResponse>>(`/operations?accountId=${accountId}`)

export const operationsRequests = {
  OPERATIONS_CACHE_KEY,
  getOperations,
}
