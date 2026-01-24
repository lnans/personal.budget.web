import { z } from 'zod'

import { AccountsErrors } from '../accountsErrors'

const MAX_NAME_LENGTH = 20

export const RenameAccountFormSchema = z.object({
  name: z.string().min(1, { message: AccountsErrors.NameRequired }).max(MAX_NAME_LENGTH, { message: AccountsErrors.NameTooLong }),
})

export type RenameAccountFormDto = z.infer<typeof RenameAccountFormSchema>
