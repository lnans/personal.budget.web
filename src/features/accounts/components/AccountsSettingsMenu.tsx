import { PencilIcon, Settings2Icon, TrashIcon } from 'lucide-react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'

import { useAccountsStore } from '../stores/accountsStore'

type AccountsSettingsMenuProps = {
  accountId: string
  onOpenChange: (open: boolean) => void
}

function AccountsSettingsMenu({ accountId, onOpenChange }: AccountsSettingsMenuProps) {
  const { t } = useTranslation()
  const { setEditingAccountId, setDeletingAccountId } = useAccountsStore((state) => state.actions)

  const handleEditClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setEditingAccountId(accountId)
      console.warn('Edition mode will be implemented in next pull request.', accountId)
    },
    [accountId, setEditingAccountId]
  )

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setDeletingAccountId(accountId)
      console.warn('Deletion mode will be implemented in next pull request.', accountId)
    },
    [accountId, setDeletingAccountId]
  )

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <span
          className="absolute right-3 flex size-6 translate-x-0 items-center justify-center rounded-md opacity-100 transition-all hover:bg-sidebar-border md:translate-x-2 md:opacity-0 md:group-hover/menu-button:translate-x-1 md:group-hover/menu-button:opacity-100 md:group-focus-visible/menu-button:translate-x-1 md:group-focus-visible/menu-button:opacity-100 md:group-active/menu-button:translate-x-1 md:group-active/menu-button:opacity-100 md:data-[state=open]:translate-x-1 md:data-[state=open]:opacity-100"
          role="button"
        >
          <Settings2Icon className="size-4 text-muted-foreground" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleEditClick}>
            <PencilIcon />
            {t('common.edit')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={handleDeleteClick}>
            <TrashIcon />
            {t('common.delete')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { AccountsSettingsMenu }
