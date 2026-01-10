import { z } from 'zod'

const MAX_DESCRIPTION_LENGTH = 100

export const AddOperationFormSchema = z.object({
  description: z.string().min(1).max(MAX_DESCRIPTION_LENGTH),
  amount: z.number(),
})

export type AddOperationFormDto = z.infer<typeof AddOperationFormSchema>
