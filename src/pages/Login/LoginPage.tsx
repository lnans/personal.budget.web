import './LoginPage.scss'

import { authRequests } from '@api'
import { Button, Card, TextInput } from '@components'
import { useFormValidator, useToast } from '@hooks'
import { ErrorResponse, SignInRequest, SignInRequestValidator, SignInResponse } from '@models'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

type Props = {
  // eslint-disable-next-line no-unused-vars
  onAuthenticate: (isAuthenticated: boolean) => void
}

function LoginPage({ onAuthenticate }: Props) {
  const toaster = useToast()
  const { t } = useTranslation()

  const tokenKey = import.meta.env.VITE_TOKEN_KEY
  const onError = (error: ErrorResponse) => toaster.error(t(error.message))
  const onSubmit = (form: SignInRequest) => signIn(form)
  const onSuccess = (data: SignInResponse) => {
    onAuthenticate(true)
    localStorage.setItem(tokenKey, data.token!)
  }

  const { mutate: signIn, isLoading } = useMutation<SignInResponse, ErrorResponse, SignInRequest>(
    authRequests.signIn,
    {
      onSuccess,
      onError,
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidator<SignInRequest>(SignInRequestValidator)

  return (
    <div className='login-page'>
      <Card>
        <img className='login-page__logo' alt='logo' src='/logo.png' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            formControl={register}
            name='username'
            label={t('pages.login.username')}
            fullWidth
            icon='ri-user-3-line'
            error={errors?.username?.message ? t(errors?.username?.message) : undefined}
            disabled={isLoading}
          />
          <TextInput
            formControl={register}
            name='password'
            label={t('pages.login.password')}
            fullWidth
            type='password'
            icon='ri-lock-2-line'
            error={errors?.password?.message ? t(errors?.password?.message) : undefined}
            disabled={isLoading}
          />
          <Button loading={isLoading} fullWidth>
            {t('pages.login.submit')}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
