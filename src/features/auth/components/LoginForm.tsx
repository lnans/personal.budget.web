import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Form } from '@/components/form/FormBase'
import InputTextForm from '@/components/form/InputTextForm'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/tailwind-merge'
import { resolver } from '@/lib/validation'
import { AuthFormDto, authFormSchema, AuthTokensDto } from '@/types/authTypes'

import { useLogin } from '../api/login'

type LoginFormProps = {
  onSuccess?: (authToken: AuthTokensDto) => void
  className?: string
}

export function LoginForm({ onSuccess, className }: LoginFormProps) {
  const { t } = useTranslation()
  const { mutate: login, isPending } = useLogin({ mutationConfig: { onSuccess } })

  const form = useForm<AuthFormDto>({ resolver: resolver(authFormSchema) })

  function onSubmit(form: AuthFormDto) {
    login({ form })
  }

  return (
    <Card className={cn('mx-auto max-w-sm dark:shadow-neutral-800 shadow-xl ', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">{t('features.login.title')}</CardTitle>
            <CardDescription>{t('features.login.header')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <InputTextForm control={form.control} name="login" label={t('features.login.form.username')} autocomplete="off" />
              <InputTextForm control={form.control} name="password" label={t('features.login.form.password')} type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="mt-2 w-full" loading={isPending}>
              {t('actions.sign_in')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
