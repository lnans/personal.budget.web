import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from '@/App'
import { lazyImport } from '@/lib/lazyimport'

const { AuthPage } = lazyImport(() => import('@/app/auth/AuthPage'), 'AuthPage')
const { MainPage } = lazyImport(() => import('@/app/main/MainPage'), 'MainPage')

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/auth',
          element: <AuthPage />,
        },
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
