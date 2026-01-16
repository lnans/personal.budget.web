import type { ComponentProps } from 'react'
import { Controller, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form'

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/Field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

type SelectOption = {
  value: string
  label: string
}

type SelectControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ComponentProps<typeof Select> &
  UseControllerProps<TFieldValues, TName> & {
    label: string
    description?: string
    placeholder?: string
    options: SelectOption[]
  }

function SelectControlled<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  defaultValue,
  options,
  ...props
}: SelectControlledProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message ? [{ message: fieldState.error.message }] : undefined

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Select {...props} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>{description}</FieldDescription>
            <FieldError errors={errorMessage} />
          </Field>
        )
      }}
    />
  )
}

export { SelectControlled }
export type { SelectOption }
