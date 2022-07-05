import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import Button, { Color } from './Button'

describe('● Render:', () => {
  test('[default] → should render <button>', () => {
    render(<Button>Test</Button>)

    const button = screen.getByTestId('btn')

    expect(button).toBeDefined()
    expect(button).toHaveClass('btn')
    expect(button).toHaveClass('btn--primary')
    expect(button).not.toHaveClass('btn--disabled')
    expect(button).not.toHaveClass('btn--loading')
    expect(button).not.toHaveClass('btn--full')
    expect(button).not.toBeDisabled()
  })

  test('[disabled] → should render <button> disabled', () => {
    render(<Button disabled>Test</Button>)

    const button = screen.getByTestId('btn')

    expect(button).toBeDefined()
    expect(button).toHaveClass('btn')
    expect(button).toHaveClass('btn--primary')
    expect(button).toHaveClass('btn--disabled')
    expect(button).not.toHaveClass('btn--loading')
    expect(button).toBeDisabled()
  })

  test('[loading] → should render <button> disabled', () => {
    render(<Button loading>Test</Button>)

    const button = screen.getByTestId('btn')

    expect(button).toBeDefined()
    expect(button).toHaveClass('btn')
    expect(button).toHaveClass('btn--primary')
    expect(button).not.toHaveClass('btn--disabled')
    expect(button).toHaveClass('btn--loading')
    expect(button).toBeDisabled()
  })
})

describe('● Render with class:', () => {
  test('[fullWidth] → should render <button> with class btn--full', () => {
    render(<Button fullWidth>Test</Button>)

    const button = screen.getByTestId('btn')

    expect(button).toBeDefined()
    expect(button).toHaveClass('btn--full')
  })

  test.each([
    ['primary', 'btn--primary'],
    ['success', 'btn--success'],
    ['error', 'btn--error'],
    ['warning', 'btn--warning'],
  ])('[%s] → should render <button> with class %s', (arg: string, expectedClass: string) => {
    const color = arg as Color
    render(<Button color={color}>Test</Button>)

    const button = screen.getByTestId('btn')

    expect(button).toBeDefined()
    expect(button).toHaveClass(expectedClass)
  })
})

describe('● When user click', () => {
  test('[default] → should trigger onClick() event', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Test</Button>)

    const button = screen.getByTestId('btn')

    fireEvent.click(button)

    expect(button).toBeDefined()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('[disabled] → should NOT trigger onClick() event', () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Test
      </Button>
    )

    const button = screen.getByTestId('btn')

    fireEvent.click(button)

    expect(button).toBeDefined()
    expect(onClick).toHaveBeenCalledTimes(0)
  })

  test('[loading] → should NOT trigger onClick() event', () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Test
      </Button>
    )

    const button = screen.getByTestId('btn')

    fireEvent.click(button)

    expect(button).toBeDefined()
    expect(onClick).toHaveBeenCalledTimes(0)
  })
})
