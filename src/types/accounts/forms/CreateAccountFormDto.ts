import { z } from 'zod'

import { AccountTypeSchema } from '../enums/AccountType'

const MAX_NAME_LENGTH = 20

export const CreateAccountFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'errors.Account.Name.Required' })
    .max(MAX_NAME_LENGTH, { message: 'errors.Account.Name.TooLong' }),
  type: AccountTypeSchema,
  initialBalance: z.number(), // TODO: parse string to number if needed, if NaN or failed set to 0
})

export type CreateAccountFormDto = z.infer<typeof CreateAccountFormSchema>
