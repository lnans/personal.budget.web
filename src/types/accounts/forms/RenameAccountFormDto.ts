import { z } from 'zod'

const MAX_NAME_LENGTH = 20

export const RenameAccountFormSchema = z.object({
  name: z.string().min(1).max(MAX_NAME_LENGTH),
})

export type RenameAccountFormDto = z.infer<typeof RenameAccountFormSchema>
