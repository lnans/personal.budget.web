import { yupResolver } from '@hookform/resolvers/yup'
import { DeepPartial, UnpackNestedValue, useForm, UseFormReturn } from 'react-hook-form'
import { AnyObjectSchema } from 'yup'

export function useFormValidator<TSchema>(
  validator: AnyObjectSchema,
  defaultValues?: UnpackNestedValue<DeepPartial<TSchema>>
): UseFormReturn<TSchema> {
  return useForm<TSchema>({ resolver: yupResolver(validator), defaultValues })
}
