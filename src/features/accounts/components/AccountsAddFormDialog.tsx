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
    <ResponsiveDialog title={t('accounts.add')} open={isCreatingAccount} onOpenChange={setIsCreatingAccount}>
      <AccountAddForm className="p-4" />
    </ResponsiveDialog>
  )
}

function AccountAddForm({ className }: React.ComponentProps<'form'>) {
  const { t } = useTranslation()
  const setIsCreatingAccount = useAccountsStore((state) => state.actions.setIsCreatingAccount)

  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: AccountsFn.createAccount,
    onSuccess: (_1, _2, _3, context) => {
      setIsCreatingAccount(false)
      context.client.invalidateQueries({ queryKey: queryKeys.accounts.all })
    },
  })

  const form = useForm<CreateAccountFormDto>({
    resolver: zodResolver(CreateAccountFormSchema),
    defaultValues: {
      name: '',
      type: 'Checking',
      initialBalance: 12.3,
    },
  })

  const onSubmit = (data: CreateAccountFormDto) => {
    createAccount(data)
  }

  const accountTypes = [
    { value: 'Checking', label: t('accounts.add.type.Checking') },
    { value: 'Savings', label: t('accounts.add.type.Savings') },
  ]

  const isSubmitDisabled = !form.formState.isValid || isPending

  return (
    <form className={cn('grid items-start gap-6', className)} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <InputControlled control={form.control} name="name" label={t('accounts.add.name')} autoFocus disabled={isPending} />
        <div className="grid grid-cols-2 gap-2">
          <SelectControlled
            control={form.control}
            name="type"
            label={t('accounts.add.type')}
            options={accountTypes}
            disabled={isPending}
          />
          <InputNumberControlled
            control={form.control}
            name="initialBalance"
            label={t('accounts.add.initialBalance')}
            disabled={isPending}
            thousandSeparator=" "
            suffix=" €"
            decimalScale={2}
            fixedDecimalScale
          />
        </div>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitDisabled} loading={isPending}>
        {t('actions.save')}
      </Button>
    </form>
  )
}

export { AccountsAddFormDialog }
