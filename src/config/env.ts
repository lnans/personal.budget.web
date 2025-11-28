import { z } from 'zod'

export const envSchema = z.object({
  VITE_API_URL: z.url({ protocol: /^https?$/, message: 'VITE_API_URL must be a valid URL' }),
})

export type Env = z.infer<typeof envSchema>
