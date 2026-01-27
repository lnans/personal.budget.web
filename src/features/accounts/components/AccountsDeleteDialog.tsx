import { useQuery } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { useDeleteAccount } from '@/api/commands/AccountsCommands'
import { AccountsQueryOptions } from '@/api/endpoints/AccountsEndpoints'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

import { useAccountsStore } from '../stores/accountsStore'

function AccountsDeleteDialog() {
  const { t } = useTranslation()
  const [confirmation, setConfirmation] = useState<string>('')
  const confirmationInputRef = useRef<HTMLInputElement>(null)

  const deletingAccountId = useAccountsStore((state) => state.deletingAccountId)
  const { setDeletingAccountId } = useAccountsStore((state) => state.actions)

  const { data: accounts } = useQuery(AccountsQueryOptions.getAccounts())
  const account = accounts?.find((account) => account.id === deletingAccountId)
  const accountName = account?.name ?? ''
  const canDelete = confirmation === accountName

  const { mutate: deleteAccount, isPending } = useDeleteAccount()

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setDeletingAccountId(null)
        setConfirmation('')
      }
    },
    [setDeletingAccountId]
  )

  const handleDelete = useCallback(() => {
    if (deletingAccountId) {
      deleteAccount(deletingAccountId, {
        onSuccess: () => {
          setDeletingAccountId(null)
          setConfirmation('')
        },
      })
    }
  }, [deleteAccount, deletingAccountId, setDeletingAccountId, setConfirmation])

  return (
    <AlertDialog open={!!deletingAccountId} onOpenChange={handleOpenChange}>
      <AlertDialogContent
        size="default"
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          requestAnimationFrame(() => confirmationInputRef.current?.focus())
        }}
      >
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{t('accounts.delete.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            <Trans i18nKey="accounts.delete.description" values={{ accountName }} />
            <Input
              ref={confirmationInputRef}
              autoFocus
              className="mt-4"
              value={confirmation}
              onBlur={() => {
                if (!canDelete) {
                  confirmationInputRef.current?.focus()
                }
              }}
              onChange={(e) => setConfirmation(e.target.value)}
              onFocus={() => {
                if (!canDelete) {
                  confirmationInputRef.current?.select()
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (canDelete) {
                    handleDelete()
                  }
                }
              }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} variant="outline">
            {t('actions.cancel')}
          </AlertDialogCancel>
          <Button disabled={!canDelete} loading={isPending} variant="destructive" onClick={handleDelete}>
            {t('actions.delete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { AccountsDeleteDialog }
