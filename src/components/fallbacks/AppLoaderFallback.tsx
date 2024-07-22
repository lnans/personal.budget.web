import { useTranslation } from 'react-i18next'

function AppLoaderFallback() {
  const { t } = useTranslation()
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="relative inline-block h-1 w-60 overflow-hidden rounded-full bg-neutral-900/10 after:absolute after:left-0 after:top-0 after:h-1 after:w-12 after:animate-progressIndeterminate after:rounded-full after:bg-indigo-500 after:content-[''] dark:bg-neutral-100/10 after:dark:bg-neutral-100" />
        <p className="text-gray-700 dark:text-gray-300">{t('common.app_loading')}</p>
      </div>
    </div>
  )
}

export default AppLoaderFallback
