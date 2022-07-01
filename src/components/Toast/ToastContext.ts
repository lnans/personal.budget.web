/* eslint-disable no-unused-vars */
import { createContext } from 'react'

export type ToastApi = {
  info: (message: string) => void
  success: (message: string) => void
  warning: (message: string) => void
  error: (message: string) => void
}

export const ToastContext = createContext<ToastApi>({
  info: () => {},
  success: () => {},
  warning: () => {},
  error: () => {},
})
