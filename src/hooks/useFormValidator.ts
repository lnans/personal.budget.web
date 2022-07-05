import { yupResolver } from '@hookform/resolvers/yup'
import { DeepPartial, useForm, UseFormReturn } from 'react-hook-form'
import { AnyObjectSchema } from 'yup'

export function useFormValidator<TSchema>(validator: AnyObjectSchema, defaultValues?: DeepPartial<TSchema>): UseFormReturn<TSchema> {
  return useForm<TSchema>({ resolver: yupResolver(validator), defaultValues })
}
