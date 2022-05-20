import { AccountTile, AccountTileNew, SectionTitle } from '@components'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import { accountsService } from '@services'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<AccountDetailsResponse[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [, setCreateAccount] = useState<boolean>(false)
  const { t } = useTranslation()

  useEffect(() => {
    const getAllAccounts = async () => {
      const result = await accountsService.getAll()
      setAccounts(result.data)
    }
    getAllAccounts()
  }, [])

  return (
    <>
      <SectionTitle>{t('pages.accounts.title')}</SectionTitle>
      {accounts.map((account) => (
        <AccountTile
          key={account.id}
          account={account}
          isSelected={selectedAccount === account.id}
          onClick={(id) => setSelectedAccount(id)}
        />
      ))}
      <AccountTileNew onClick={() => setCreateAccount(true)} />
    </>
  )
}