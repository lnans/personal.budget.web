import { TransactionType } from './TransactionType'

export type TransactionInfoResponse = {
  id: string
  description: string
  tagId: string
  tagName: string
  tagColor: string
  type: TransactionType
  accountId: string
  accountName: string
  amount: number
  creationDate: string
  executionDate: string
}
