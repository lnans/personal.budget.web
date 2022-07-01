import './AccountCard.scss'

import { accountsRequests } from '@api'
import { Card } from '@components'
import { AccountInfoResponse } from '@models'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

import AccountItem from '../AccountItem/AccountItem'

type Props = {
  title: string
  archived?: boolean
  selectedAccount?: AccountInfoResponse
  onSelect: (id: AccountInfoResponse) => void // eslint-disable-line no-unused-vars
  onCreate?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

function AccountCard({
  title,
  archived = false,
  selectedAccount,
  onSelect,
  onCreate,
  onEdit,
  onDelete,
}: Props) {
  const { t } = useTranslation()
  const { data } = useQuery(
    accountsRequests.ACCOUNT_CACHE_KEY + archived,
    accountsRequests.getAccounts({ archived })
  )

  return (
    <Card width='450px'>
      <div className='account-card__title'>
        <p>{title}</p>

        {!archived && (
          <button className='account-add' onClick={onCreate}>
            <i className='ri-add-circle-line'></i>
          </button>
        )}
      </div>

      {data && data.length ? (
        data.map((account) => (
          <AccountItem
            key={account.id}
            account={account}
            isSelected={account.id === selectedAccount?.id}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className='account-card__no-data'>{t('common.no_data')}</p>
      )}
    </Card>
  )
}

export default AccountCard
