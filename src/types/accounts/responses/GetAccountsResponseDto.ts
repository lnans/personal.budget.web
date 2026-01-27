import type { AccountType } from '../enums/AccountType'

export type GetAccountsResponseDto = {
  id: string
  name: string
  bank: string
  type: AccountType
  balance: number
  createdAt: string
  updatedAt: string
}
