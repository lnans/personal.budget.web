import { useQuery } from '@tanstack/react-query'
import { ChartPieIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AccountsQueryOptions } from '@/api/endpoints/AccountsEndpoints'
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton } from '@/components/ui/Sidebar'
import { cn, cnCurrencyColor, formatCurrency } from '@/lib/utils'

type AccountsNetWorthProps = {
  selectedAccountId: string | null
  onAccountClick: (accountId: string | null) => void
}

function AccountsNetWorth({ selectedAccountId, onAccountClick }: AccountsNetWorthProps) {
  const { t } = useTranslation()

  const { data: accounts } = useQuery(AccountsQueryOptions.getAccounts())

  const netWorth = accounts?.reduce((acc, account) => acc + account.balance, 0) ?? 0

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuButton
            className="border"
            isActive={selectedAccountId === null}
            size="lg"
            onClick={() => onAccountClick(null)}
          >
            <ChartPieIcon />
            <span>{t('accounts.netWorth')}</span>
            <span className={cn(cnCurrencyColor(netWorth), 'ms-auto font-semibold')}>{formatCurrency(netWorth)}</span>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export { AccountsNetWorth }
