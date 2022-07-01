import { fireEvent, render, screen } from '@testing-library/react'
import { UseFormRegister } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'

import SelectInput from './SelectInput'

type TestRequest = { value: string }
const onChange = vi.fn()
const register: UseFormRegister<TestRequest> = (name) => ({
  ref: () => vi.fn(),
  onChange,
  onBlur: vi.fn(),
  name,
})

const items = [
  {
    id: '1',
    value: 'Item 1',
  },
  {
    id: '2',
    value: 'Item 2',
  },
]

describe('● Render:', () => {
  test('[default] → should render <input>', () => {
    render(<SelectInput label='Test' formControl={register} name='value' items={items} itemKey='id' itemValue='value' />)

    const input = screen.getByTestId('select')
    const container = input?.parentElement

    expect(container).toBeDefined()
    expect(container).toHaveClass('select')
    expect(container).not.toHaveClass('select--disabled')
    expect(container).not.toHaveClass('select--full')
    expect(container).not.toHaveClass('select--has-value')
    expect(container).not.toHaveClass('select--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('select__control')
    expect(input).not.toBeDisabled()
  })

  test('[disabled] → should render <input> disabled', () => {
    render(<SelectInput label='Test' disabled items={items} itemKey='id' itemValue='value' />)

    const input = screen.getByTestId('select')
    const container = input?.parentElement

    expect(container).toBeDefined()
    expect(container).toHaveClass('select')
    expect(container).toHaveClass('select--disabled')
    expect(container).not.toHaveClass('select--full')
    expect(container).not.toHaveClass('select--has-value')
    expect(container).not.toHaveClass('select--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('select__control')
    expect(input).toBeDisabled()
  })

  test('[fullWidth] → should render <input> in fullWidth', () => {
    render(<SelectInput label='Test' fullWidth items={items} itemKey='id' itemValue='value' />)

    const input = screen.getByTestId('select')
    const container = input?.parentElement

    expect(container).toBeDefined()
    expect(container).toHaveClass('select')
    expect(container).not.toHaveClass('select--disabled')
    expect(container).toHaveClass('select--full')
    expect(container).not.toHaveClass('select--has-value')
    expect(container).not.toHaveClass('select--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('select__control')
    expect(input).not.toBeDisabled()
  })

  test('[error] → should render <input> with error message', () => {
    render(<SelectInput label='Test' error='Error' items={items} itemKey='id' itemValue='value' />)

    const input = screen.getByTestId('select')
    const container = input?.parentElement
    const error = screen.getByText(/Error/i)

    expect(container).toBeDefined()
    expect(container).toHaveClass('select')
    expect(container).not.toHaveClass('select--disabled')
    expect(container).not.toHaveClass('select--full')
    expect(container).not.toHaveClass('select--has-value')
    expect(container).toHaveClass('select--has-error')
    expect(input).toBeDefined()
    expect(input).toHaveClass('select__control')
    expect(input).not.toBeDisabled()
    expect(error).toBeDefined()
  })
})

describe('● When user select:', () => {
  test('[default] → should render <input> with has-value and is-active class', () => {
    render(<SelectInput label='Test' formControl={register} name='value' items={items} itemKey='id' itemValue='value' />)

    const input = screen.getByTestId('select')
    let container = screen.getByTestId('select-container')

    expect(input).toHaveClass('select__control')
    expect(input).not.toBeDisabled()
    expect(container).not.toHaveClass('select--isActive')

    fireEvent.focus(input)

    container = screen.getByTestId('select-container')

    expect(container).toHaveClass('select--isActive')

    const selectItems = screen.getAllByTestId('select-item')

    expect(selectItems).toHaveLength(2)

    fireEvent.click(selectItems[0])

    container = screen.getByTestId('select-container')

    expect(container).not.toHaveClass('select--isActive')
    expect(container).toHaveClass('select--has-value')
  })

  test('[event] → should trigger onChange with item not selected', async () => {
    const { onChange } = register('value')
    render(<SelectInput label='Test' formControl={register} name='value' items={items} itemKey='id' itemValue='value' />)
    const input = screen.getByTestId('select')
    fireEvent.focus(input)

    const selectItems = screen.getAllByTestId('select-item')
    fireEvent.click(selectItems[0])

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('[event] → should not trigger onChange with item already selected', async () => {
    const { onChange } = register('value')
    render(<SelectInput label='Test' formControl={register} name='value' items={items} itemKey='id' itemValue='value' defaultValue='1' />)
    const input = screen.getByTestId('select')
    fireEvent.focus(input)

    const selectItems = screen.getAllByTestId('select-item')
    fireEvent.click(selectItems[0])

    expect(onChange).toHaveBeenCalledTimes(0)
  })
})
