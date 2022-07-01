import './AccountItem.scss'

import { AccountInfoResponse, AccountType } from '@models'
import { numberWithSpaces } from '@utils'
import clsx from 'clsx'

type Props = {
  account: AccountInfoResponse
  isSelected?: boolean
  onSelect: (account: AccountInfoResponse) => void // eslint-disable-line no-unused-vars
  onEdit?: () => void
  onDelete?: () => void
}

function AccountItem({ account, isSelected, onSelect, onEdit, onDelete }: Props) {
  const amountClass = clsx({
    'account-balance': true,
    negative: account.balance < 0,
    neutral: account.balance === 0,
  })
  const iconClass = clsx({
    'ri-bank-line': account.type === AccountType.Expenses,
    'ri-wallet-3-line': account.type === AccountType.Savings,
  })
  return (
    <>
      <div className='account-divider' />
      <div
        tabIndex={-1}
        role='button'
        className='account'
        onClick={() => onSelect(account)}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(account)}
      >
        <div className='account__icon'>
          <i className={iconClass}></i>
        </div>
        <div className='account__title'>
          <p className='account-name'>{account.name}</p>
          <p className='account-bank'>{account.bank}</p>
        </div>
        <div className={amountClass}>
          <p className='account-balance__amount'>
            {numberWithSpaces(account.balance).toString().replace('.', ',')}
          </p>
          <span className='account-balance__currency'>€</span>
        </div>
        {isSelected && (
          <>
            <button className='account__action' onClick={onEdit}>
              <i className='ri-file-edit-line'></i>
            </button>
            <button className='account__action danger' onClick={onDelete}>
              <i className='ri-delete-bin-line'></i>
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default AccountItem
