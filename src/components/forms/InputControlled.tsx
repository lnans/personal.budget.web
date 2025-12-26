import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import type { ComponentProps } from 'react'
import { Controller, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type InputTextControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ComponentProps<typeof Input> &
  UseControllerProps<TFieldValues, TName> & {
    label: string
    description?: string
    placeholder?: string
  }

function InputControlled<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, description, placeholder, defaultValue, ...props }: InputTextControlledProps<TFieldValues, TName>) {
  const { t } = useTranslation()
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...props}
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
          />
          <FieldDescription>{description}</FieldDescription>
          {fieldState.invalid && fieldState.error?.message && <FieldError errors={[{ message: t(fieldState.error.message) }]} />}
        </Field>
      )}
    />
  )
}

export { InputControlled }
