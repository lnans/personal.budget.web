import type { AccountType } from '../../accounts/enums/AccountType'

export type AddOperationResponseDto = {
  id: string
  name: string
  type: AccountType
  balance: number
  createdAt: string
  updatedAt: string
}
