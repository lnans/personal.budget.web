import './AccountDeleteForm.scss'

import { accountsRequests } from '@api'
import { Button } from '@components'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'

type Props = {
  accountId: string
  isArchived: boolean
  onSuccess: () => void
}

function AccountDeleteForm({ accountId, isArchived, onSuccess }: Props) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const onSubmitSuccess = () => {
    queryClient.invalidateQueries(accountsRequests.ACCOUNT_CACHE_KEY + isArchived)
    queryClient.invalidateQueries(accountsRequests.ACCOUNT_CACHE_KEY + !isArchived)
    onSuccess()
  }

  const { mutate: archived, isLoading: archiveLoading } = useMutation(
    accountsRequests.ACCOUNT_CACHE_KEY,
    accountsRequests.archiveAccount(accountId, !isArchived),
    {
      onSuccess: onSubmitSuccess,
    }
  )
  const { mutate: remove, isLoading: deleteLoading } = useMutation(accountsRequests.ACCOUNT_CACHE_KEY, accountsRequests.deleteAccount(accountId), {
    onSuccess: onSubmitSuccess,
  })

  return (
    <div className='account-delete-form'>
      <Button color='error' loading={archiveLoading || deleteLoading} onClick={remove}>
        {t('pages.accounts.account_delete.delete')}
      </Button>
      <Button color='warning' loading={archiveLoading || deleteLoading} onClick={archived}>
        {t('pages.accounts.account_delete.archive')}
      </Button>
    </div>
  )
}

export default AccountDeleteForm
