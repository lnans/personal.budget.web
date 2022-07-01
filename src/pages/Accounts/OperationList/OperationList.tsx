import './OperationList.scss'

import { operationsRequests } from '@api'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

type Props = {
  accountId: string
}

function OperationList({ accountId }: Props) {
  const { data, refetch } = useQuery(
    operationsRequests.OPERATIONS_CACHE_KEY,
    operationsRequests.getOperations({ accountId })
  )

  useEffect(() => {
    refetch()
  }, [accountId])

  return (
    <div>
      {data &&
        data.data.map((value) => (
          <div key={value.id}>
            {value.accountId} - {value.description}
          </div>
        ))}
    </div>
  )
}

export default OperationList
