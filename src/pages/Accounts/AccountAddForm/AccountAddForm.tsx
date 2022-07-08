import './AccountAddForm.scss'

import { accountsRequests } from '@api'
import { Button, SelectInput, TextInput } from '@components'
import { useFormValidator } from '@hooks'
import { AccountType, CreateAccountRequest, CreateAccountRequestValidator } from '@models'
import { EnumToSelect } from '@utils'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RiMoneyEuroCircleLine } from 'react-icons/ri'
import { useMutation, useQueryClient } from 'react-query'

import i18n from '@i18n'

type Props = {
  onSuccess: () => void
}

function AccountAddForm({ onSuccess }: Props) {
  const { t } = useTranslation()
  const accountTypes = EnumToSelect(AccountType, 'account_type', i18n)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormValidator<CreateAccountRequest>(CreateAccountRequestValidator)

  const onCreateAccount = () => {
    const archived = false
    queryClient.invalidateQueries(accountsRequests.ACCOUNT_CACHE_KEY + archived)
    reset()
    onSuccess()
  }

  const { mutate: createAccount, isLoading } = useMutation(accountsRequests.ACCOUNT_CACHE_KEY, accountsRequests.postAccount, { onSuccess: onCreateAccount })

  const onSubmit: SubmitHandler<CreateAccountRequest> = (form: CreateAccountRequest) => {
    createAccount(form)
  }

  return (
    <div className='account-add-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            label={t('pages.accounts.account_add.name')}
            formControl={register}
            name='name'
            disabled={isLoading}
            error={errors.name?.message ? t(errors.name.message) : undefined}
            fullWidth
          />
          <TextInput
            label={t('pages.accounts.account_add.bank')}
            formControl={register}
            name='bank'
            disabled={isLoading}
            error={errors.bank?.message ? t(errors.bank.message) : undefined}
            fullWidth
          />
        </div>
        <div className='account-add-form__line'>
          <TextInput
            label={t('pages.accounts.account_add.initial_amount')}
            type='number'
            Icon={RiMoneyEuroCircleLine}
            formControl={register}
            name='initialBalance'
            disabled={isLoading}
            error={errors.initialBalance?.message ? t(errors.initialBalance.message) : undefined}
          />
          <SelectInput
            label={t('pages.accounts.account_add.type')}
            items={accountTypes}
            itemKey='id'
            itemValue='value'
            formControl={register}
            name='type'
            disabled={isLoading}
            error={errors.type?.message ? t(errors.type.message) : undefined}
          />
        </div>
        <div className='account-add-form__actions'>
          <Button loading={isLoading}> {t('pages.accounts.account_add.validate')}</Button>
        </div>
      </form>
    </div>
  )
}

export default AccountAddForm
