import { z } from 'zod'

const MAX_LOGIN_LENGTH = 20

export const SignInFormSchema = z.object({
  login: z.string().min(1).max(MAX_LOGIN_LENGTH),
  password: z.string().min(1),
})

export type SignInFormDto = z.infer<typeof SignInFormSchema>
