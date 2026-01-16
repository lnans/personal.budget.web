import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { AuthFn } from '@/api/endpoints/AuthenticationEndpoints'
import { InputControlled } from '@/components/forms/InputControlled'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { FieldGroup } from '@/components/ui/Field'
import { useAuthStore } from '@/features/authentication/stores/authStore'
import { cn } from '@/lib/utils'
import type { SignInFormDto } from '@/types/authentication/forms/SignInFormDto'
import { SignInFormSchema } from '@/types/authentication/forms/SignInFormDto'

export function SignInForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { t } = useTranslation()

  const { setAuthTokens, clearAuth } = useAuthStore((state) => state.actions)

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: AuthFn.signIn,
    onSuccess: (data) => {
      setAuthTokens(data.bearer, data.refreshToken)
    },
    onError: () => {
      clearAuth()
    },
  })

  const form = useForm<SignInFormDto>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const onSubmit = (data: SignInFormDto) => {
    signIn(data)
  }

  const isSubmitDisabled = form.formState.isValid && !isPending

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('auth.signIn.title')}</CardTitle>
          <CardDescription>{t('auth.signIn.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <InputControlled autoFocus control={form.control} label={t('auth.signIn.login.label')} name="login" />
              <InputControlled control={form.control} label={t('auth.signIn.password.label')} name="password" type="password" />
              <Button disabled={!isSubmitDisabled} loading={isPending} type="submit">
                {t('auth.signIn.submit')}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
