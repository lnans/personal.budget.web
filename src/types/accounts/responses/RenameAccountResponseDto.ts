import type { AccountType } from '../enums/AccountType'

export type RenameAccountResponseDto = {
  id: string
  name: string
  type: AccountType
  balance: number
  createdAt: string
  updatedAt: string
}
