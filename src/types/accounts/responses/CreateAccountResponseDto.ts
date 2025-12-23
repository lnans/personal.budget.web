import type { AccountType } from '../enums/AccountType'

export type CreateAccountResponseDto = {
  id: string
  name: string
  type: AccountType
  balance: number
  createdAt: string
  updatedAt: string
}
