import { z } from 'zod'

import { AccountTypeSchema } from '../enums/AccountType'

const MAX_NAME_LENGTH = 20

export const CreateAccountFormSchema = z.object({
  name: z.string().min(1).max(MAX_NAME_LENGTH),
  type: AccountTypeSchema,
  initialBalance: z.number(),
})

export type CreateAccountFormDto = z.infer<typeof CreateAccountFormSchema>
