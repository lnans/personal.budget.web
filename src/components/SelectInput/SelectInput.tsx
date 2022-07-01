import './SelectInput.scss'

import { useOuterClick, useRegisterFormControl } from '@hooks'
import clsx from 'clsx'
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { useUID } from 'react-uid'

export type SelectItem = {
  // eslint-disable-next-line no-unused-vars
  [key in string]: string
}

export type Props<TFormValues> = {
  label: string
  disabled?: boolean
  itemKey: string
  itemValue: string
  items: SelectItem[]
  fullWidth?: boolean
  error?: string
  defaultValue?: string
  formControl?: UseFormRegister<TFormValues>
  name?: Path<TFormValues>
}

function SelectInput<TFormValues>({ label, disabled, itemKey, itemValue, items, fullWidth, error, defaultValue, formControl, name }: Props<TFormValues>) {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState<string>()
  const [labelValue, setLabelValue] = useState<string>()
  const uid = useUID()
  const ctnRef = useOuterClick<HTMLDivElement>(() => setIsActive(false))
  const ref = useRef<HTMLInputElement | null>(null)
  const fmc = useRegisterFormControl(formControl, name)

  // Set default value
  useEffect(() => {
    if (defaultValue) {
      const item = items.find((i) => i[itemKey] === defaultValue)
      if (item) {
        setValue(item[itemKey])
        setLabelValue(item[itemValue])
      }
    }
  }, [])

  /**
   * Select event on list
   * Trigger native input event to use value input and react hook form
   * @param {SelectItem} item Selected item
   */
  const onSelectItem = (item: SelectItem) => {
    setLabelValue(item[itemValue])

    const nativeInputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    nativeInputSetter?.call(ref.current, item[itemKey])

    const e = new Event('input', { bubbles: true })
    ref.current?.dispatchEvent(e)
  }

  const nativeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsActive(false)
    fmc.onChange && fmc.onChange(e)
  }

  const selectClasses = clsx({
    select: true,
    'select--full': fullWidth,
    'select--disabled': disabled,
    'select--has-value': !!value,
    'select--isActive': isActive,
    'select--has-error': error,
  })

  return (
    <div ref={ctnRef} className={selectClasses} data-testid='select-container'>
      <input
        {...fmc.types}
        id={uid}
        data-testid='select'
        className='select__control'
        type='text'
        disabled={disabled}
        defaultValue={defaultValue}
        autoComplete='off'
        ref={(r) => {
          fmc.inputRefCallBack && fmc.inputRefCallBack(r)
          ref.current = r
        }}
        onFocus={() => !disabled && setIsActive(true)}
        onChange={nativeInputChange}
        readOnly
      />
      <label htmlFor={uid} className='select__label'>
        {label}
      </label>
      <label htmlFor={uid} className='select__value'>
        {labelValue}
      </label>
      <i className='select__icon' />
      {error && (
        <label htmlFor={uid} className='select__error'>
          {error}
        </label>
      )}
      {isActive && (
        <div className='select-list-items'>
          {items.map((item) => (
            <Fragment key={item[itemKey]}>
              {item.id === value ? (
                <button id={`selectItem_${item[itemKey]}`} className='select-list__item select-list__item--selected' data-testid='select-item'>
                  {item[itemValue]}
                </button>
              ) : (
                <button id={`selectItem_${item[itemKey]}`} className='select-list__item' onClick={() => onSelectItem(item)} data-testid='select-item'>
                  {item[itemValue]}
                </button>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectInput
