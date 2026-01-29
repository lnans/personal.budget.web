import { SidebarContent } from '@/components/ui/Sidebar'

import { AccountsAddButton } from './AccountsAddButton'
import { AccountsList } from './AccountsList'
import { AccountsNetWorth } from './AccountsNetWorth'
import { AccountsAddFormDialog } from './forms/AccountsAddFormDialog'
import { AccountsDeleteFormDialog } from './forms/AccountsDeleteFormDialog'
import { AccountsPatchFormDialog } from './forms/AccountsPatchFormDialog'

function AccountsSidebarContent() {
  return (
    <SidebarContent>
      <AccountsNetWorth />
      <AccountsList />

      <AccountsAddButton />
      <AccountsAddFormDialog />
      <AccountsPatchFormDialog />
      <AccountsDeleteFormDialog />
    </SidebarContent>
  )
}

export { AccountsSidebarContent }
