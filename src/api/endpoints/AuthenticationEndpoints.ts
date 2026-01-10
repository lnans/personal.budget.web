import { apiClient } from '@/lib/axios'
import type { SignInFormDto } from '@/types/authentication/forms/SignInFormDto'
import type { GetCurrentUserResponseDto } from '@/types/authentication/responses/GetCurrentUserResponseDto'
import type { RefreshTokenResponseDto } from '@/types/authentication/responses/RefreshTokenResponseDto'
import type { SignInResponseDto } from '@/types/authentication/responses/SignInResponseDto'

const group = 'auth'

export const AuthFn = {
  getCurrentUser: async () => {
    const response = await apiClient.get<GetCurrentUserResponseDto>(`/${group}`)
    return response.data
  },
  signIn: async (data: SignInFormDto) => {
    const response = await apiClient.post<SignInResponseDto>(`/${group}/signin`, data)
    return response.data
  },
  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post<RefreshTokenResponseDto>(`/${group}/refresh`, { refreshToken })
    return response.data
  },
} as const
