import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

import { useAuthStore } from '@/features/authentication/stores/authStore'

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authToken = useAuthStore.getState().authToken

  if (authToken?.token) {
    config.headers.Authorization = `Bearer ${authToken.token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(error.response?.data)
  }
)
