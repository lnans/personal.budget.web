import { ChartPieIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SidebarMenuButton } from '@/components/ui/Sidebar'
import { cn, cnCurrencyColor, formatCurrency } from '@/lib/utils'

function AccountsNetWorth() {
  const { t } = useTranslation()
  // TODO: get net worth from API
  const netWorth = 157.45
  return (
    <SidebarMenuButton size="lg" className="border">
      <ChartPieIcon />
      <span>{t('accounts.netWorth')}</span>
      <span className={cn(cnCurrencyColor(netWorth), 'ms-auto font-semibold')}>{formatCurrency(netWorth)}</span>
    </SidebarMenuButton>
  )
}

export { AccountsNetWorth }
