import { PlusCircleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Item, ItemContent, ItemDescription, ItemHeader } from '@/components/ui/Item'

import { useAccountsStore } from '../stores/accountsStore'

function AccountsAddButton() {
  const { t } = useTranslation()
  const { toggleIsCreatingAccount } = useAccountsStore((state) => state.actions)

  return (
    <Item
      variant="outline"
      className="mt-2 p-2.5 gap-2 border-dashed opacity-50 hover:opacity-80 transition duration-150 ease-in-out hover:-translate-y-0.5"
      role="button"
      onClick={toggleIsCreatingAccount}
    >
      <ItemHeader className="justify-center">
        <PlusCircleIcon size={18} />
      </ItemHeader>
      <ItemContent>
        <ItemDescription className="text-center text-white text-xs">{t('accounts.add')}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

export { AccountsAddButton }
