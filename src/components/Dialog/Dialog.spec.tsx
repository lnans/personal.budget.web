import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import Dialog from './Dialog'

describe('● Render:', () => {
  test('[default] → should display dialog', () => {
    render(
      <Dialog open={true} title='Title' onClose={() => {}}>
        Test
      </Dialog>
    )
    const dialog = screen.queryByText('Test')

    expect(dialog).toBeTruthy()
    expect(dialog).toBeInTheDocument()
  })

  test('[close] → should not display dialog', () => {
    render(
      <Dialog open={false} title='Title' onClose={() => {}}>
        Test
      </Dialog>
    )
    const dialog = screen.queryByText('Test')

    expect(dialog).not.toBeTruthy()
    expect(dialog).not.toBeInTheDocument()
  })
})

describe('● When user click:', () => {
  test('[close] → should call onClose', () => {
    const onClose = vi.fn()
    render(
      <Dialog open={true} title='Title' onClose={onClose}>
        Test
      </Dialog>
    )
    const btn = screen.getByTestId('close-dialog')
    fireEvent.click(btn)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
