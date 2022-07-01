import { useToast } from '@hooks'
import { fireEvent, render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import { describe, expect, test, vi } from 'vitest'

import ToastProvider from './ToastProvider'

describe('● Render', () => {
  test('[info] → Should have toast--primary class', async () => {
    const Toast = () => {
      const toast = useToast()
      useEffect(() => {
        toast.info('test')
      }, [])

      return <div></div>
    }

    render(<Toast />, { wrapper: ToastProvider })

    const toast = await screen.findByTestId('toast')
    expect(toast).toBeInTheDocument()
    expect(toast).toHaveClass('toast--primary')
  })

  test('[success] → Should have toast--success class', async () => {
    const Toast = () => {
      const toast = useToast()
      useEffect(() => {
        toast.success('test')
      }, [])

      return <div></div>
    }

    render(<Toast />, { wrapper: ToastProvider })

    const toast = await screen.findByTestId('toast')
    expect(toast).toBeInTheDocument()
    expect(toast).toHaveClass('toast--success')
  })

  test('[warning] → Should have toast--warning class', async () => {
    const Toast = () => {
      const toast = useToast()
      useEffect(() => {
        toast.warning('test')
      }, [])

      return <div></div>
    }

    render(<Toast />, { wrapper: ToastProvider })

    const toast = await screen.findByTestId('toast')
    expect(toast).toBeInTheDocument()
    expect(toast).toHaveClass('toast--warning')
  })

  test('[error] → Should have toast--error class', async () => {
    const Toast = () => {
      const toast = useToast()
      useEffect(() => {
        toast.error('test')
      }, [])

      return <div></div>
    }

    render(<Toast />, { wrapper: ToastProvider })

    const toast = await screen.findByTestId('toast')
    expect(toast).toBeInTheDocument()
    expect(toast).toHaveClass('toast--error')
  })
})

describe('● When user close', () => {
  test('[default] → should close toast message', async () => {
    const Toast = () => {
      const toast = useToast()
      useEffect(() => {
        toast.info('test')
      }, [])

      return <div></div>
    }

    render(<Toast />, { wrapper: ToastProvider })

    let button = await screen.findByTestId('toast__close-btn')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    vi.runAllTimers()
    button = await screen.findByTestId('toast__close-btn')

    expect(button).not.toBeInTheDocument()
  })
})
