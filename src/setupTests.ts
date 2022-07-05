import { cleanup } from '@testing-library/react'
import { afterEach, expect, vi } from 'vitest'

interface CustomMatchers<R = unknown> {
  toHaveClass(expected: string): R
  toBeDisabled(): R
  toBeInTheDocument(): R
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}

expect.extend({
  toHaveClass: (received: HTMLElement, expected: string) => {
    if (!received.classList.contains(expected)) {
      return {
        message: () => `\n - expected to have class: ${expected}\n - received: ${received.className}`,
        expected: expected,
        actual: received.className,
        pass: false,
      }
    } else {
      return { message: () => `element has class: ${expected}`, pass: true }
    }
  },
  toBeDisabled: (received: HTMLInputElement | HTMLButtonElement) => {
    if (!received.disabled) {
      return {
        message: () => '\n - expected disabled: true\n - received: false',
        expected: true,
        actual: received.disabled,
        pass: false,
      }
    } else {
      return {
        message: () => 'element is disabled',
        pass: true,
      }
    }
  },
  toBeInTheDocument: (received: HTMLElement) => {
    if (received === null || received.ownerDocument !== received.getRootNode({ composed: true })) {
      return {
        message: () => 'Element not found',
        pass: false,
      }
    }
    return {
      message: () => 'Element found',
      pass: true,
    }
  },
})

vi.useFakeTimers()

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
