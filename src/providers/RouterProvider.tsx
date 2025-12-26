import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from '@/App'
import { lazyImport } from '@/lib/lazyimport'
import AuthProvider from '@/providers/AuthProvider'

const { AuthPage } = lazyImport(() => import('@/app/auth/AuthPage'), 'AuthPage')
const { MainPage } = lazyImport(() => import('@/app/main/MainPage'), 'MainPage')

function ProtectedLayout() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/auth',
      element: <AuthPage />,
    },
    {
      path: '/',
      element: <ProtectedLayout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default AppRouter
