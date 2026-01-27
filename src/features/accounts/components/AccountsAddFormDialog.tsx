import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { AccountsFn } from '@/api/endpoints/AccountsEndpoints'
import { queryKeys } from '@/api/QueryKeys'
import { InputControlled } from '@/components/forms/InputControlled'
import { InputNumberControlled } from '@/components/forms/InputNumberControlled'
import { SelectControlled } from '@/components/forms/SelectControlled'
import { Button } from '@/components/ui/Button'
import { FieldGroup } from '@/components/ui/Field'
import { ResponsiveDialog } from '@/components/ui/ResponsiveDialog'
import { cn } from '@/lib/utils'
import { CreateAccountFormSchema, type CreateAccountFormDto } from '@/types/accounts/forms/CreateAccountFormDto'

import { useAccountsStore } from '../stores/accountsStore'

function AccountsAddFormDialog() {
  const { t } = useTranslation()

  const isCreatingAccount = useAccountsStore((state) => state.isCreatingAccount)
  const setIsCreatingAccount = useAccountsStore((state) => state.actions.setIsCreatingAccount)

  return (
    <ResponsiveDialog open={isCreatingAccount} title={t('accounts.add')} onOpenChange={setIsCreatingAccount}>
      <AccountAddForm className="p-4" />
    </ResponsiveDialog>
  )
}

function AccountAddForm({ className }: React.ComponentProps<'form'>) {
  const { t } = useTranslation()
  const setIsCreatingAccount = useAccountsStore((state) => state.actions.setIsCreatingAccount)

  const {
    mutate: createAccount,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: AccountsFn.createAccount,
    onSuccess: (_, __, ___, context) => {
      setIsCreatingAccount(false)
      context.client.invalidateQueries({ queryKey: queryKeys.accounts.all })
    },
  })

  const form = useForm<CreateAccountFormDto>({
    resolver: zodResolver(CreateAccountFormSchema),
    defaultValues: {
      name: '',
      bank: '',
      type: 'Checking',
      initialBalance: 0,
    },
  })

  const onSubmit = (data: CreateAccountFormDto) => {
    createAccount(data)
  }

  const accountTypes = [
    { value: 'Checking', label: t('accounts.add.type.Checking') },
    { value: 'Savings', label: t('accounts.add.type.Savings') },
  ]

  const isSubmitDisabled = isSuccess || isPending

  return (
    <form className={cn('grid items-start gap-6', className)} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <InputControlled autoFocus control={form.control} disabled={isPending} label={t('accounts.add.name')} name="name" />
        <InputControlled control={form.control} disabled={isPending} label={t('accounts.add.bank')} name="bank" />
        <div className="grid grid-cols-2 gap-2">
          <SelectControlled
            control={form.control}
            disabled={isPending}
            label={t('accounts.add.type')}
            name="type"
            options={accountTypes}
          />
          <InputNumberControlled
            fixedDecimalScale
            control={form.control}
            decimalScale={2}
            disabled={isPending}
            label={t('accounts.add.initialBalance')}
            name="initialBalance"
            suffix=" €"
            thousandSeparator=" "
          />
        </div>
      </FieldGroup>
      <Button disabled={isSubmitDisabled} loading={isPending} type="submit">
        {t('actions.save')}
      </Button>
    </form>
  )
}

export { AccountsAddFormDialog }
