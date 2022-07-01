import { authRequests } from '@api'
import { AuthLoader, NavBar } from '@components'
import { AuthInfoResponse } from '@models'
import { AccountsPage, LoginPage } from '@pages'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

function App() {
  const [isInit, setIsInit] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useQuery<AuthInfoResponse>(authRequests.AUTHENTICATION_CACHE_KEY, authRequests.getAuthInfo, {
    onSuccess: () => setIsAuthenticated(true),
    onSettled: () => setIsInit(true),
  })

  if (!isInit) {
    return <AuthLoader />
  } else if (!isAuthenticated) {
    return <LoginPage onAuthenticate={setIsAuthenticated} />
  }

  return <AuthenticatedApp />
}

function AuthenticatedApp() {
  const [currentPath, setCurrentPath] = useState<string>('/')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const appRoutes = {
    dashboard: { path: '/', name: t('app.navbar.dashboard'), icon: 'ri-dashboard-line' },
    accounts: { path: '/accounts', name: t('app.navbar.accounts'), icon: 'ri-wallet-3-line' },
  }
  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location])

  return (
    <div className='main-container'>
      <NavBar routes={appRoutes} currentPath={currentPath} onNavigate={navigate} />
      <main>
        <Routes>
          <Route path={appRoutes.accounts.path} element={<AccountsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
