import { apiClient } from '@/lib/axios'
import type { SignInFormDto } from '@/types/authentication/forms/SignInFormDto'
import type { SignInResponseDto } from '@/types/authentication/responses/SignInResponseDto'

export const authMutations = {
  signIn: async (data: SignInFormDto) => {
    const response = await apiClient.post<SignInResponseDto>('/auth/signin', data)
    return response.data
  },
} as const
