import './AccountUpdateForm.scss'

import { accountsRequests } from '@api'
import { Button, TextInput } from '@components'
import { useFormValidator } from '@hooks'
import { AccountInfoResponse, UpdateAccountRequest, UpdateAccountRequestValidator } from '@models'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'

type Props = {
  account: AccountInfoResponse
  onSuccess: () => void
}

function AccountUpdateForm({ account, onSuccess }: Props) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormValidator<UpdateAccountRequest>(UpdateAccountRequestValidator)
  useEffect(() => reset({ id: account.id, name: account.name, bank: account.bank }), [])

  const onUpdateAccount = () => {
    queryClient.invalidateQueries(accountsRequests.ACCOUNT_CACHE_KEY + account.archived)
    reset()
    onSuccess()
  }

  const { mutate: update, isLoading } = useMutation(accountsRequests.ACCOUNT_CACHE_KEY, accountsRequests.updateAccount(account.id), {
    onSuccess: onUpdateAccount,
  })

  const onSubmit: SubmitHandler<UpdateAccountRequest> = (form: UpdateAccountRequest) => {
    update(form)
  }

  return (
    <div className='account-update-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            label={t('pages.accounts.account_update.name')}
            formControl={register}
            name='name'
            disabled={isLoading}
            defaultValue={account.name}
            error={errors.name?.message ? t(errors.name.message) : undefined}
            fullWidth
          />
          <TextInput
            label={t('pages.accounts.account_update.bank')}
            formControl={register}
            name='bank'
            disabled={isLoading}
            defaultValue={account.bank}
            error={errors.bank?.message ? t(errors.bank.message) : undefined}
            fullWidth
          />
        </div>
        <div className='account-update-form__actions'>
          <Button loading={isLoading}> {t('pages.accounts.account_update.validate')}</Button>
        </div>
      </form>
    </div>
  )
}

export default AccountUpdateForm
