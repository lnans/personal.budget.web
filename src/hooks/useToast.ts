import { ToastContext } from '@components'
import { useContext } from 'react'

export const useToast = () => useContext(ToastContext)
