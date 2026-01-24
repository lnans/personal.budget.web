import { z } from 'zod'

import { AccountsErrors } from '../accountsErrors'
import { AccountTypeSchema } from '../enums/AccountType'

const MAX_NAME_LENGTH = 20

export const CreateAccountFormSchema = z.object({
  name: z.string().min(1, { message: AccountsErrors.NameRequired }).max(MAX_NAME_LENGTH, { message: AccountsErrors.NameTooLong }),
  type: AccountTypeSchema,
  initialBalance: z.number(),
})

export type CreateAccountFormDto = z.infer<typeof CreateAccountFormSchema>
