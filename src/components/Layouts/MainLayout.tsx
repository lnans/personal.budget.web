import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'

import { ButtonTheme } from '@/components/Actions'
import { AppLogo } from '@/components/Elements'
import { LoadingFallback } from '@/components/Fallbacks'
import { ROUTER_LINKS } from '@/config'

function MainLayout() {
  const { t } = useTranslation('navbar')
  return (
    <>
      <nav className="fixed top-0 inline-flex items-center h-nav w-screen px-6 gap-6 z-50 shadow bg-white dark:bg-neutral-950">
        <AppLogo className="mx-3" />
        {Object.values(ROUTER_LINKS).map(({ path, name }) => (
          <NavLink
            key={path}
            className="flex items-center h-full px-2 border-b-2 border-b-transparent transition-all hover:border-b-gray-300 hover:text-gray-700 font-medium tracking-wide text-gray-500 aria-current-page:text-gray-950 aria-current-page:border-b-indigo-600"
            to={path}
          >
            {t(name)}
          </NavLink>
        ))}
        <div className="flex-grow" />
        <ButtonTheme />
      </nav>
      <main className="flex mt-nav h-main overflow-auto relative">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export default MainLayout
