import { z } from 'zod'

import { AccountsErrors } from '../accountsErrors'

const MAX_NAME_LENGTH = 20
const MAX_BANK_LENGTH = 20

export const RenameAccountFormSchema = z.object({
  name: z.string().min(1, { message: AccountsErrors.NameRequired }).max(MAX_NAME_LENGTH, { message: AccountsErrors.NameTooLong }),
  bank: z.string().min(1, { message: AccountsErrors.BankRequired }).max(MAX_BANK_LENGTH, { message: AccountsErrors.BankTooLong }),
})

export type RenameAccountFormDto = z.infer<typeof RenameAccountFormSchema>
