import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { ResponsiveDialog } from '@/components/ui/ResponsiveDialog'
import { cn } from '@/lib/utils'

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

  // TODO: Add account form here
  return (
    <form className={cn('grid items-start gap-6', className)}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">{t('actions.save')}</Button>
    </form>
  )
}

export { AccountsAddFormDialog }
