import { IconLogout, IconUserCircle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/DropDownMenu'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'

function Profile() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  const { getUsername, clearAccessToken } = useAuthStore((state) => state.actions)

  const handleLogout = () => {
    clearAccessToken()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" icon={IconUserCircle} size="icon" className="ml-auto rounded-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{getUsername()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as 'dark' | 'light')}>
          <DropdownMenuRadioItem value="dark">{t('common.theme.dark')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">{t('common.theme.light')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {t('actions.sign_out')}
          <DropdownMenuShortcut>
            <IconLogout className="ms-3" size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
