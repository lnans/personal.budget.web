import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

export function SignInForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { t } = useTranslation()

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('auth.signIn.title')}</CardTitle>
          <CardDescription>{t('auth.signIn.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t('auth.signIn.email.label')}</FieldLabel>
                <Input id="email" />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">{t('auth.signIn.password.label')}</FieldLabel>
                <Input id="password" type="password" />
              </Field>
              <Field>
                <Button type="submit">{t('auth.signIn.submit')}</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
