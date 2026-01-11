import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from '@/components/ui/Sidebar'

import { AccountsAddFormDialog } from './AccountsAddFormDialog'
import { AccountsList } from './AccountsList'
import { AccountsNetWorth } from './AccountsNetWorth'

function AccountsSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <AccountsNetWorth />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <AccountsList />

      <AccountsAddFormDialog />
    </SidebarContent>
  )
}

export { AccountsSidebarContent }
