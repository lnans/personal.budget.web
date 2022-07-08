import './AccountItem.scss'

import { AccountInfoResponse, AccountType } from '@models'
import { numberWithSpaces } from '@utils'
import { RiBankLine, RiDeleteBinLine, RiFileEditLine, RiWallet3Line } from 'react-icons/ri'

import clsx from 'clsx'

type Props = {
  account: AccountInfoResponse
  isSelected?: boolean
  onSelect: (account: AccountInfoResponse) => void
  onEdit?: () => void
  onDelete?: () => void
}

function AccountItem({ account, isSelected, onSelect, onEdit, onDelete }: Props) {
  const amountClass = clsx({
    'account-balance': true,
    negative: account.balance < 0,
    neutral: account.balance === 0,
  })

  const IconAccount = ({ accountType }: { accountType: AccountType }) => {
    switch (accountType) {
      case AccountType.Expenses:
        return <RiBankLine />
      case AccountType.Savings:
        return <RiWallet3Line />
    }
  }

  return (
    <>
      <div className='account-divider' />
      <div tabIndex={-1} role='button' className='account' onClick={() => onSelect(account)} onKeyDown={(e) => e.key === 'Enter' && onSelect(account)}>
        <div className='account__icon'>
          <IconAccount accountType={account.type} />
        </div>
        <div className='account__title'>
          <p className='account-name'>{account.name}</p>
          <p className='account-bank'>{account.bank}</p>
        </div>
        <div className={amountClass}>
          <p className='account-balance__amount'>{numberWithSpaces(account.balance).toString().replace('.', ',')}</p>
          <span className='account-balance__currency'>€</span>
        </div>
        {isSelected && (
          <>
            <button className='account__action' onClick={onEdit}>
              <RiFileEditLine />
            </button>
            <button className='account__action danger' onClick={onDelete}>
              <RiDeleteBinLine />
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default AccountItem
