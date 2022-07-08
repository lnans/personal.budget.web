import './OperationList.scss'

import { transactionsRequests } from '@api'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

type Props = {
  accountId: string
}

function OperationList({ accountId }: Props) {
  const { data, refetch } = useQuery(transactionsRequests.TRANSACTIONS_CACHE_KEY, transactionsRequests.getTransactions({ accountId }))

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
