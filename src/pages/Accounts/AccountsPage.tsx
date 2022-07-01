import './AccountsPage.scss'

import { Dialog } from '@components'
import { AccountInfoResponse } from '@models'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import AccountAddForm from './AccountAddForm/AccountAddForm'
import AccountCard from './AccountCard/AccountCard'
import AccountDeleteForm from './AccountDeleteForm/AccountDeleteForm'
import AccountUpdateForm from './AccountUpdateForm/AccountUpdateForm'
import OperationList from './OperationList/OperationList'

function AccountsPage() {
  const { t } = useTranslation()
  const [selectedAccount, setSelectedAccount] = useState<AccountInfoResponse>()
  const [accountDialogOpen, setAccountDialogOpen] = useState<boolean>(false)
  const [accountUpdateDialogOpen, setAccountUpdateDialogOpen] = useState<boolean>(false)
  const [accountDeleteDialogOpen, setAcountDeleteDialogOpen] = useState<boolean>(false)
  return (
    <div className='accounts-page'>
      <div>
        <AccountCard
          title={t('pages.accounts.account_card.enabled')}
          selectedAccount={selectedAccount}
          onSelect={setSelectedAccount}
          onCreate={() => setAccountDialogOpen(true)}
          onEdit={() => setAccountUpdateDialogOpen(true)}
          onDelete={() => setAcountDeleteDialogOpen(true)}
        />
        <AccountCard
          archived
          title={t('pages.accounts.account_card.archived')}
          selectedAccount={selectedAccount}
          onSelect={setSelectedAccount}
          onEdit={() => setAccountUpdateDialogOpen(true)}
          onDelete={() => setAcountDeleteDialogOpen(true)}
        />
      </div>

      {selectedAccount && <OperationList accountId={selectedAccount.id} />}

      {/* Add account form */}
      <Dialog title={t('pages.accounts.account_add.title')} open={accountDialogOpen} onClose={() => setAccountDialogOpen(false)}>
        <AccountAddForm onSuccess={() => setAccountDialogOpen(false)} />
      </Dialog>

      {/* Update account form */}
      <Dialog title={t('pages.accounts.account_update.title')} open={accountUpdateDialogOpen} onClose={() => setAccountUpdateDialogOpen(false)}>
        {selectedAccount && <AccountUpdateForm account={selectedAccount} onSuccess={() => setAccountUpdateDialogOpen(false)} />}
      </Dialog>

      {/* Delete account form */}
      <Dialog title={t('pages.accounts.account_delete.title')} open={accountDeleteDialogOpen} onClose={() => setAcountDeleteDialogOpen(false)}>
        <AccountDeleteForm accountId={selectedAccount?.id ?? ''} isArchived={!!selectedAccount?.archived} onSuccess={() => setAcountDeleteDialogOpen(false)} />
      </Dialog>
    </div>
  )
}

export default AccountsPage
