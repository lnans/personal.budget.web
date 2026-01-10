import type { AccountType } from '../enums/AccountType'

export type DeleteAccountResponseDto = {
  id: string
  name: string
  type: AccountType
  balance: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}
