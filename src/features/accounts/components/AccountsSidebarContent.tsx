import { SidebarContent } from '@/components/ui/Sidebar'

import { AccountsAddButton } from './AccountsAddButton'
import { AccountsAddFormDialog } from './AccountsAddFormDialog'
import { AccountsList } from './AccountsList'
import { AccountsNetWorth } from './AccountsNetWorth'

type AccountsSidebarContentProps = {
  selectedAccountId: string | null
  onAccountClick: (accountId: string | null) => void
}

function AccountsSidebarContent({ selectedAccountId, onAccountClick }: AccountsSidebarContentProps) {
  return (
    <SidebarContent>
      <AccountsNetWorth selectedAccountId={selectedAccountId} onAccountClick={onAccountClick} />
      <AccountsList selectedAccountId={selectedAccountId} onAccountClick={onAccountClick} />

      <AccountsAddButton />
      <AccountsAddFormDialog />
    </SidebarContent>
  )
}

export { AccountsSidebarContent }
