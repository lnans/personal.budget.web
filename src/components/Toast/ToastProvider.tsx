import './ToastProvider.scss'

import { ReactNode, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { RiCheckboxCircleLine, RiErrorWarningLine, RiInformationLine } from 'react-icons/ri'
import { ToastApi, ToastContext } from './ToastContext'
import { ToastMessage, ToastType } from './ToastMessage'

import clsx from 'clsx'

type ToastProviderProps = {
  children: ReactNode
}

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const open = (message: string, type: ToastType) => setToasts((currentToasts) => [new ToastMessage(message, type), ...currentToasts])

  const close = (id: string) => setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))

  const contextValue = useMemo<ToastApi>(
    () => ({
      info: (message) => open(message, 'info'),
      success: (message) => open(message, 'success'),
      warning: (message) => open(message, 'warning'),
      error: (message) => open(message, 'error'),
    }),
    []
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {createPortal(
        <div className='toasts-wrapper'>
          {toasts.map((toast) => (
            <Toast key={toast.id} type={toast.type} onClose={() => close(toast.id)}>
              {toast.message}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

type ToastProps = {
  children: ReactNode
  type: ToastType
  onClose: () => void
}

function Toast({ children, type, onClose }: ToastProps) {
  const [isLeaving, setIsLeaving] = useState<boolean>(false)
  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(onClose, 300)
  }

  useEffect(() => {
    const id = setTimeout(handleClose, 5000)
    return () => clearTimeout(id)
  }, [])

  const toastClass = clsx({
    toast: true,
    'toast--leaving': isLeaving,
    'toast--primary': type === 'info',
    'toast--success': type === 'success',
    'toast--warning': type === 'warning',
    'toast--error': type === 'error',
  })

  const Icon = ({ icon }: { icon: ToastType }) => {
    switch (icon) {
      case 'info':
        return <RiInformationLine />
      case 'success':
        return <RiCheckboxCircleLine />
      default:
        return <RiErrorWarningLine />
    }
  }

  return (
    <div className={toastClass} data-testid='toast'>
      <div className='toast__icon'>
        <Icon icon={type} />
      </div>
      <div className='toast__text'>{children}</div>
      <button onClick={handleClose} className='toast__close-btn' data-testid='toast__close-btn'>
        <i className='toast-close-icon'></i>
      </button>
    </div>
  )
}

export default ToastProvider
