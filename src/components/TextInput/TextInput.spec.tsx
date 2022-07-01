import { fireEvent, render, screen } from '@testing-library/react'
import { UseFormRegister } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'

import TextInput from './TextInput'

type TestRequest = { value: string }
const onChange = vi.fn()
const register: UseFormRegister<TestRequest> = (name) => ({
  ref: () => vi.fn(),
  onChange,
  onBlur: vi.fn(),
  name,
})

describe('● Render:', () => {
  test('[default] → should render <input>', () => {
    render(<TextInput label='Test' formControl={register} name='value' />)

    const input = screen.getByTestId('input')
    const container = input?.parentElement

    expect(container).toBeDefined()
    expect(container).toHaveClass('input')
    expect(container).not.toHaveClass('input--disabled')
    expect(container).not.toHaveClass('input--icon')
    expect(container).not.toHaveClass('input--full')
    expect(container).not.toHaveClass('input--has-value')
    expect(container).not.toHaveClass('input--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('input__control')
    expect(input).not.toBeDisabled()
  })

  test('[disabled] → should render <input> disabled', () => {
    render(<TextInput label='Test' disabled />)

    const input = screen.getByTestId('input')
    const container = input?.parentElement

    expect(container).toBeDefined()
    expect(container).toHaveClass('input')
    expect(container).toHaveClass('input--disabled')
    expect(container).not.toHaveClass('input--icon')
    expect(container).not.toHaveClass('input--full')
    expect(container).not.toHaveClass('input--has-value')
    expect(container).not.toHaveClass('input--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('input__control')
    expect(input).toBeDisabled()
  })

  test('[fullWidth] → should render <input> in fullWidth', () => {
    render(<TextInput label='Test' fullWidth />)

    const input = screen.getByTestId('input')
    const container = input?.parentElement

    expect(container).toBeDefined()
    expect(container).toHaveClass('input')
    expect(container).not.toHaveClass('input--disabled')
    expect(container).not.toHaveClass('input--icon')
    expect(container).toHaveClass('input--full')
    expect(container).not.toHaveClass('input--has-value')
    expect(container).not.toHaveClass('input--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('input__control')
    expect(input).not.toBeDisabled()
  })

  test('[icon] → should render <input> with icon', () => {
    render(<TextInput label='Test' icon='icon' />)

    const input = screen.getByTestId('input')
    const container = input?.parentElement

    expect(container).toBeDefined()
    expect(container).toHaveClass('input')
    expect(container).not.toHaveClass('input--disabled')
    expect(container).toHaveClass('input--icon')
    expect(container).not.toHaveClass('input--full')
    expect(container).not.toHaveClass('input--has-value')
    expect(container).not.toHaveClass('input--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('input__control')
    expect(input).not.toBeDisabled()
  })

  test('[error] → should render <input> with error message', () => {
    render(<TextInput label='Test' error='Error' type='number' />)

    const input = screen.getByTestId('input')
    const container = input?.parentElement
    const error = screen.getByText(/Error/i)

    expect(container).toBeDefined()
    expect(container).toHaveClass('input')
    expect(container).not.toHaveClass('input--disabled')
    expect(container).not.toHaveClass('input--icon')
    expect(container).not.toHaveClass('input--full')
    expect(container).not.toHaveClass('input--has-value')
    expect(container).toHaveClass('input--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('input__control')
    expect(input).not.toBeDisabled()
    expect(error).toBeDefined()
  })
})

describe('● When user type:', () => {
  test('[default] → should render <input> with has-value class', () => {
    render(<TextInput label='Test' />)

    const input = screen.getByTestId('input')
    const container = input?.parentElement

    fireEvent.change(input, { target: { value: 't' } })

    expect(container).toBeDefined()
    expect(container).toHaveClass('input')
    expect(container).not.toHaveClass('input--disabled')
    expect(container).not.toHaveClass('input--icon')
    expect(container).not.toHaveClass('input--full')
    expect(container).toHaveClass('input--has-value')
    expect(container).not.toHaveClass('input--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('input__control')
    expect(input).not.toBeDisabled()
  })

  test('[event] → should trigger onChange', () => {
    const { onChange } = register('value')
    render(<TextInput label='Test' formControl={register} name='value' />)
    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { value: 'v' } })

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
