import { SidebarContent } from '@/components/ui/Sidebar'

import { AccountsAddButton } from './AccountsAddButton'
import { AccountsAddFormDialog } from './AccountsAddFormDialog'
import { AccountsList } from './AccountsList'
import { AccountsNetWorth } from './AccountsNetWorth'

function AccountsSidebarContent() {
  return (
    <SidebarContent>
      <AccountsNetWorth />
      <AccountsList />

      <AccountsAddButton />
      <AccountsAddFormDialog />
    </SidebarContent>
  )
}

export { AccountsSidebarContent }
