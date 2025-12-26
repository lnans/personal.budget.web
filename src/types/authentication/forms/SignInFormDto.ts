import { z } from 'zod'

const MAX_LOGIN_LENGTH = 20

export const SignInFormSchema = z.object({
  login: z
    .string()
    .min(1, { message: 'errors.User.Login.Required' })
    .max(MAX_LOGIN_LENGTH, { message: 'errors.User.Login.TooLong' }),
  password: z.string().min(1, { message: 'errors.User.Password.Required' }),
})

export type SignInFormDto = z.infer<typeof SignInFormSchema>
