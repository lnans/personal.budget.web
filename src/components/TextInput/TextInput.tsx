import './TextInput.scss'

import { useBlurEffect, useRegisterFormControl } from '@hooks'
import { ChangeEvent, useState, useId } from 'react'
import { useRef } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { IconType } from 'react-icons'

import clsx from 'clsx'

export type TextFieldType = 'text' | 'password' | 'number'

export type Props<TFormValues> = {
  label: string
  disabled?: boolean
  Icon?: IconType
  type?: TextFieldType
  fullWidth?: boolean
  error?: string
  defaultValue?: string
  formControl?: UseFormRegister<TFormValues>
  name?: Path<TFormValues>
}

function TextInput<TFormValues>({ label, disabled, Icon, type = 'text', fullWidth, error, defaultValue, formControl, name }: Props<TFormValues>) {
  const [hasValue, setHasValue] = useState<boolean>(!!defaultValue)
  const uid = useId()
  const ref = useRef<HTMLInputElement | null>(null)
  const fmc = useRegisterFormControl(formControl, name)

  useBlurEffect(ref?.current, [disabled])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value)
    fmc.onChange && fmc.onChange(e)
  }

  const inputClasses = clsx({
    input: true,
    'input--full': fullWidth,
    'input--disabled': disabled,
    'input--icon': Icon,
    'input--has-value': hasValue,
    'input--has-error': error,
  })

  return (
    <div className={inputClasses}>
      <input
        {...fmc.types}
        id={uid}
        data-testid='input'
        className='input__control'
        type={type}
        step={type === 'number' ? '0.01' : undefined}
        disabled={disabled}
        defaultValue={defaultValue}
        autoComplete='off'
        ref={(r) => {
          fmc.inputRefCallBack && fmc.inputRefCallBack(r)
          ref.current = r
        }}
        onChange={onInputChange}
        lang='en'
      />
      <label htmlFor={uid} className='input__label'>
        {label}
      </label>
      {error && (
        <label htmlFor={uid} className='input__error'>
          {error}
        </label>
      )}
      {Icon && (
        <div className='input__icon'>
          <Icon />
        </div>
      )}
    </div>
  )
}

export default TextInput
