import { AccountType } from './AccountType'

export type AccountInfoResponse = {
  id: string
  name: string
  bank: string
  icon: string
  type: AccountType
  balance: number
  archived: boolean
  creationDate: string
}
