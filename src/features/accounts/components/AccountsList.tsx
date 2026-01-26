import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { AccountsQueryOptions } from '@/api/endpoints/AccountsEndpoints'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar'
import { cn, cnCurrencyColor, formatCurrency } from '@/lib/utils'
import type { GetAccountsResponseDto } from '@/types/accounts/responses/GetAccountsResponseDto'

type AccountsListProps = {
  selectedAccountId: string | null
  onAccountClick: (accountId: string | null) => void
}

function AccountsList({ selectedAccountId, onAccountClick }: AccountsListProps) {
  const { t } = useTranslation()

  const { data: accounts } = useQuery(AccountsQueryOptions.getAccounts())

  const checkingAccounts = accounts?.filter((account) => account.type === 'Checking') ?? []
  const savingsAccounts = accounts?.filter((account) => account.type === 'Savings') ?? []

  return (
    <>
      <AccountGroup
        accounts={checkingAccounts}
        label={t('accounts.list.checking')}
        labelNoData={t('common.noData')}
        selectedAccountId={selectedAccountId}
        onAccountClick={onAccountClick}
      />
      <AccountGroup
        accounts={savingsAccounts}
        label={t('accounts.list.savings')}
        labelNoData={t('common.noData')}
        selectedAccountId={selectedAccountId}
        onAccountClick={onAccountClick}
      />
    </>
  )
}

type AccountGroupProps = {
  accounts: GetAccountsResponseDto[]
  label: string
  labelNoData: string
  selectedAccountId: string | null
  onAccountClick: (accountId: string | null) => void
}

function AccountGroup({ accounts, label, labelNoData, selectedAccountId, onAccountClick }: AccountGroupProps) {
  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {accounts.length === 0 ? (
            <SidebarMenuItem>
              <SidebarMenuButton disabled>{labelNoData}</SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            accounts.map((account) => (
              <SidebarMenuItem key={account.id}>
                <SidebarMenuButton
                  className="pl-4"
                  isActive={selectedAccountId === account.id}
                  onClick={() => onAccountClick(account.id)}
                >
                  <span>{account.name}</span>
                  <span className={cn(cnCurrencyColor(account.balance), 'ms-auto font-semibold')}>
                    {formatCurrency(account.balance)}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export { AccountsList }
