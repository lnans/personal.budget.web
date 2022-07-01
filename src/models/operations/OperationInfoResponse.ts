import OperationType from './OperationType'

type OperationInfoResponse = {
  id: string
  description: string
  tagId: string
  tagName: string
  tagColor: string
  type: OperationType
  accountId: string
  accountName: string
  amount: number
  creationDate: string
  executionDate: string
}

export default OperationInfoResponse
